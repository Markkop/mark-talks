#!/usr/bin/env node
/* eslint-env node */

import puppeteer from "puppeteer";
import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const PORTFOLIO_DATA_PATH = path.join(
  __dirname,
  "..",
  "app",
  "data",
  "portfolio.json"
);
const IMAGES_OUTPUT_PATH = path.join(__dirname, "..", "public", "images");

// Screenshot configuration
const SCREENSHOT_CONFIG = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  format: "png",
  fullPage: false, // Only capture viewport (top part of page)
  waitTime: 3000, // Wait 3 seconds for page to load
};

/**
 * Sanitizes a filename by removing or replacing invalid characters
 * @param {string} filename
 * @returns {string}
 */
function sanitizeFilename(filename) {
  return filename
    .replace(/[^\w\s-]/g, "") // Remove special characters except word chars, spaces, and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase();
}

/**
 * Reads and parses the portfolio data
 * @returns {Promise<Array>}
 */
async function readPortfolioData() {
  try {
    const data = await fs.readFile(PORTFOLIO_DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading portfolio data:", error.message);
    process.exit(1);
  }
}

/**
 * Extracts viewable URLs from portfolio items
 * @param {Array} portfolioItems
 * @returns {Array}
 */
function extractViewableItems(portfolioItems) {
  const viewableItems = [];

  portfolioItems.forEach((item) => {
    if (item.buttons && Array.isArray(item.buttons)) {
      item.buttons.forEach((button) => {
        if (button.type === "view" && button.enabled && button.url) {
          viewableItems.push({
            title: item.title,
            client: item.client?.name || "Unknown Client",
            url: button.url,
            date: item.date,
            description: item.description,
            filename: sanitizeFilename(
              `${item.title}-${item.client?.name || "unknown"}-${item.date}`
            ),
          });
        }
      });
    }
  });

  return viewableItems;
}

/**
 * Prompts user for custom URL input
 * @returns {Promise<Object>}
 */
async function promptCustomUrl() {
  const { customUrl, customTitle } = await inquirer.prompt([
    {
      type: "input",
      name: "customUrl",
      message: "Enter the custom URL to screenshot:",
      validate: (input) => {
        if (!input.trim()) {
          return "URL cannot be empty.";
        }
        try {
          new URL(input);
          return true;
        } catch {
          return "Please enter a valid URL (include http:// or https://).";
        }
      },
    },
    {
      type: "input",
      name: "customTitle",
      message: "Enter a title for this screenshot (optional):",
      default: "Custom Page",
    },
  ]);

  const timestamp = new Date().toISOString().slice(0, 10);
  return {
    title: customTitle || "Custom Page",
    client: "Custom",
    url: customUrl.trim(),
    date: new Date().getFullYear().toString(),
    description: "Custom URL screenshot",
    filename: sanitizeFilename(`${customTitle || "custom-page"}-${timestamp}`),
  };
}

/**
 * Prompts user to select items for screenshot
 * @param {Array} viewableItems
 * @returns {Promise<Array>}
 */
async function promptUserSelection(viewableItems) {
  console.log("📋 Available options for screenshot:\n");

  const choices = [];

  // Add portfolio items if any exist
  if (viewableItems.length > 0) {
    viewableItems.forEach((item, index) => {
      choices.push({
        name: `${item.title} (${item.client}) - ${item.url}`,
        value: { type: "portfolio", index },
        short: item.title,
      });
    });

    choices.push(new inquirer.Separator());
    choices.push({
      name: "🌟 All portfolio items",
      value: { type: "all" },
      short: "All Portfolio",
    });
    choices.push(new inquirer.Separator());
  }

  // Add custom URL option
  choices.push({
    name: "🔗 Custom URL",
    value: { type: "custom" },
    short: "Custom URL",
  });

  const { selectedOption } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: "Select item to screenshot:",
      choices,
    },
  ]);

  const selectedItems = [];

  if (selectedOption.type === "all") {
    selectedItems.push(...viewableItems);
  } else if (selectedOption.type === "portfolio") {
    selectedItems.push(viewableItems[selectedOption.index]);
  } else if (selectedOption.type === "custom") {
    const customItem = await promptCustomUrl();
    selectedItems.push(customItem);
  }

  return selectedItems;
}

/**
 * Takes a screenshot of a URL
 * @param {Object} browser
 * @param {Object} item
 * @returns {Promise<string>}
 */
async function takeScreenshot(browser, item) {
  const page = await browser.newPage();

  try {
    // Remove this for now
    // await page.setViewport({
    //   width: SCREENSHOT_CONFIG.width,
    //   height: SCREENSHOT_CONFIG.height,
    //   deviceScaleFactor: SCREENSHOT_CONFIG.deviceScaleFactor,
    // });

    console.log(`📸 Taking screenshot of: ${item.title} (${item.url})`);

    // Navigate to the URL
    await page.goto(item.url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait additional time for dynamic content
    await new Promise((resolve) =>
      setTimeout(resolve, SCREENSHOT_CONFIG.waitTime)
    );

    // Hide scrollbars by injecting CSS
    await page.addStyleTag({
      content: `
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        html, body {
          overflow-x: hidden !important;
        }
      `,
    });

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const filename = `${item.filename}-${timestamp}.${SCREENSHOT_CONFIG.format}`;
    const filepath = path.join(IMAGES_OUTPUT_PATH, filename);

    // Take screenshot
    await page.screenshot({
      path: filepath,
      fullPage: SCREENSHOT_CONFIG.fullPage,
      type: SCREENSHOT_CONFIG.format,
    });

    console.log(`✅ Screenshot saved: ${filename}`);
    return filename;
  } catch (error) {
    console.error(
      `❌ Error taking screenshot of ${item.title}:`,
      error.message
    );
    throw error;
  } finally {
    await page.close();
  }
}

/**
 * Parses command line arguments for direct URL access
 * @returns {Object|null} URL and title if provided via command line
 */
function parseCommandLineArgs() {
  const args = process.argv.slice(2);

  if (args.length >= 2 && args[0] === "--url") {
    const url = args[1];
    let title = "Custom Page";

    // Look for --title parameter
    const titleIndex = args.indexOf("--title");
    if (titleIndex !== -1 && titleIndex + 1 < args.length) {
      title = args[titleIndex + 1];
    }

    try {
      new URL(url); // Validate URL
      return {
        url: url.trim(),
        title: title.trim(),
        filename: sanitizeFilename(
          `${title.trim()}-${new Date().toISOString().slice(0, 10)}`
        ),
      };
    } catch {
      console.error("❌ Invalid URL provided:", url);
      process.exit(1);
    }
  }

  return null;
}

/**
 * Main function to run the screenshot service
 */
async function main() {
  console.log("🚀 Portfolio Screenshot Service\n");

  try {
    // Check for command line arguments first
    const cmdArgs = parseCommandLineArgs();

    if (cmdArgs) {
      console.log(`📋 Direct URL mode: ${cmdArgs.url}\n`);

      // Create item object for screenshot
      const selectedItems = [
        {
          title: cmdArgs.title,
          client: "CLI",
          url: cmdArgs.url,
          date: new Date().getFullYear().toString(),
          description: "Direct URL screenshot",
          filename: cmdArgs.filename,
        },
      ];

      console.log(`🎯 Taking screenshot of: ${cmdArgs.title}\n`);

      // Launch browser and take screenshot
      await takeScreenshotsForItems(selectedItems);
      return;
    }

    // Read portfolio data
    console.log("📖 Reading portfolio data...");
    const portfolioData = await readPortfolioData();

    // Extract viewable items
    const viewableItems = extractViewableItems(portfolioData);
    if (viewableItems.length > 0) {
      console.log(
        `📊 Found ${viewableItems.length} viewable portfolio items.\n`
      );
    } else {
      console.log(
        "📊 No viewable portfolio items found, but you can still screenshot custom URLs.\n"
      );
    }

    // Prompt user for selection
    const selectedItems = await promptUserSelection(viewableItems);
    console.log(
      `\n🎯 Selected ${selectedItems.length} items for screenshot.\n`
    );

    // Take screenshots
    await takeScreenshotsForItems(selectedItems);
  } catch (error) {
    console.error("💥 Fatal error:", error.message);
    process.exit(1);
  }
}

/**
 * Takes screenshots for the provided items
 * @param {Array} selectedItems
 */
async function takeScreenshotsForItems(selectedItems) {
  try {
    // Launch Puppeteer
    console.log("\n🌐 Launching browser...");
    let browser;

    try {
      // Use the working configuration found by testing
      browser = await puppeteer.launch({
        headless: false, // Non-headless mode as requested
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        timeout: 30000,
        defaultViewport: null, // Use full screen for non-headless
      });
      console.log("✅ Browser launched successfully in non-headless mode!");
    } catch (launchError) {
      console.log(
        "⚠️ Failed to launch browser with working config, trying fallback options..."
      );

      try {
        // Try with additional args as fallback
        browser = await puppeteer.launch({
          headless: false,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-extensions",
            "--disable-plugins",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
          ],
          timeout: 30000,
          protocolTimeout: 30000,
        });
      } catch (fallbackError) {
        console.error("❌ Failed to launch browser:");
        console.error("Original error:", launchError.message);
        console.error("Fallback error:", fallbackError.message);
        console.log("\n🔧 Troubleshooting tips:");
        console.log(
          "1. Reinstall Puppeteer: pnpm uninstall puppeteer && pnpm install puppeteer"
        );
        console.log("2. Try running: npx puppeteer browsers install chrome");
        console.log("3. Check if you have sufficient system resources");
        console.log("4. Close other browser instances and try again");
        process.exit(1);
      }
    }

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // Take screenshots
    for (const item of selectedItems) {
      try {
        const filename = await takeScreenshot(browser, item);
        results.push({ item, filename, status: "success" });
        successCount++;
      } catch (error) {
        results.push({ item, error: error.message, status: "error" });
        errorCount++;
      }
    }

    // Close browser
    try {
      await browser.close();
      console.log("🌐 Browser closed successfully.");
    } catch (closeError) {
      console.log("⚠️ Warning: Error closing browser:", closeError.message);
    }

    // Summary
    console.log("\n📊 Screenshot Summary:");
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📁 Images saved to: ${IMAGES_OUTPUT_PATH}\n`);

    // List successful screenshots
    if (successCount > 0) {
      console.log("📸 Successful Screenshots:");
      results
        .filter((r) => r.status === "success")
        .forEach((r) => console.log(`  • ${r.filename}`));
      console.log("");
    }

    // List errors
    if (errorCount > 0) {
      console.log("❌ Failed Screenshots:");
      results
        .filter((r) => r.status === "error")
        .forEach((r) => console.log(`  • ${r.item.title}: ${r.error}`));
      console.log("");
    }

    console.log("🎉 Screenshot service completed!");
  } catch (error) {
    console.error("💥 Fatal error:", error.message);
    process.exit(1);
  }
}

// Run the service
main();

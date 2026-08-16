import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { TalkCard } from "~/components/TalkCard";
import { PortfolioCard, type PortfolioItem } from "~/components/PortfolioCard";
import { SparklesCore } from "~/components/ui/sparkles";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import talks from "~/data/talks.json";
import portfolioData from "~/data/portfolio.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Mark Kop - Talks & Portfolio" },
    {
      name: "description",
      content: "A collection of talks and portfolio projects by Mark Kop",
    },
  ];
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isPortfolioMode = mode === "portfolio";
  const isTalksMode = !isPortfolioMode;

  const sortedTalks = [...talks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Cast portfolio data to correct type and sort by date (year) in descending order
  const portfolio = portfolioData as PortfolioItem[];
  const sortedPortfolio = [...portfolio].sort(
    (a, b) => parseInt(b.date) - parseInt(a.date)
  );

  const allItems = isPortfolioMode
    ? sortedPortfolio.map((item) => ({
        type: "portfolio" as const,
        item,
      }))
    : sortedTalks.map((talk) => ({ type: "talk" as const, item: talk }));

  const toggleMode = (newMode: "talks" | "portfolio") => {
    const currentMode = searchParams.get("mode") ?? "talks";
    const shouldResetToTalks = currentMode === newMode || newMode === "talks";

    if (shouldResetToTalks) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("mode");
      setSearchParams(nextParams);
      return;
    }

    setSearchParams({ mode: newMode });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <main className="px-4 py-8 relative z-10">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => toggleMode("talks")}
            className={cn(
              "border-2 transition-all duration-200",
              isTalksMode
                ? "border-amber-500 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 hover:text-amber-400"
                : "border-amber-500/30 text-amber-400/70 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5"
            )}
          >
            Talks
          </Button>
          <Button
            variant="outline"
            onClick={() => toggleMode("portfolio")}
            className={cn(
              "border-2 transition-all duration-200",
              isPortfolioMode
                ? "border-primary text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary"
                : "border-primary/30 text-primary/70 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
            )}
          >
            Projects
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allItems.map((item, index) =>
            item.type === "talk" ? (
              <TalkCard key={`talk-${index}`} talk={item.item} />
            ) : (
              <PortfolioCard key={`portfolio-${index}`} item={item.item} />
            )
          )}
        </div>
      </main>
    </div>
  );
}

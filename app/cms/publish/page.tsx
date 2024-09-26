"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storeArticles } from "@/utils/actions/articles/store-articles";
import { UploadButton } from "@/utils/uploadthing";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  slug: z.string(),
  keywords: z.string(),
  image_alt: z.string(),
  article: z.string(),
});

export default function Publish() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      keywords: "",
      image_alt: "",
      article: "",
    },
  });

  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await storeArticles(
        data?.title,
        data?.subtitle,
        data?.slug,
        data?.article,
        data?.keywords,
        imageUploadUrl,
        data?.image_alt
      );
      console.log("r", response);
      toast("Article is published");
      form.reset();
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  return (
    <main className="flex min-w-screen mt-[1rem] flex-col items-center justify-between ">
      <div className="flex flex-col gap-3 mb-[5rem] w-full px-8">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Publish
        </h1>
        <p className="leading-7">Get ready to publish your article</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter title here</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is your article title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter subtitle here</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your article subtitle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center w-full gap-3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter slug here</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your article slug.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter keywords here</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pizza, Chicken, Food" />
                    </FormControl>
                    <FormDescription>
                      Separate keywords by comma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col justify-center items-start w-full gap-3">
              <Label>Upload Article Image</Label>
              <UploadButton
                appearance={{
                  button:
                    "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 px-5",
                  container:
                    "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                  allowedContent:
                    "flex h-8 flex-col items-center justify-center px-2 text-white",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setImageUploadUrl(res?.[0]?.url);
                  toast(`Image uploaded`);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast(`ERROR! ${error.message}`);
                }}
              />
              {imageUploadUrl !== "" && (
                <div className="flex flex-col justify-center items-start w-full gap-3 mt-2">
                  <Label>Image Url</Label>
                  <Input value={imageUploadUrl} />
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="image_alt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Enter Image alt text</FormLabel>
                  <FormControl>
                    <Input placeholder="Image alt text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your image alt text.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="article"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article content here"
                      {...field}
                      rows={10}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your article content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

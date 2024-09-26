"use client";

import { TalkCard } from "@/components/TalkCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { storeTalks } from "@/utils/actions/talks/store-talks";
import { Talk } from "@/utils/types";
import { UploadButton } from "@/utils/uploadthing";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "sonner";

export default function PublishPage() {
  const [talk, setTalk] = useState<Talk>({
    title: "",
    slug: "",
    created_at: new Date().toISOString(),
    location: "",
    description: "",
    presentation_link: "",
    feedback_link: "",
    image: "https://via.placeholder.com/400x200?text=Talk+Image",
    keywords: [],
    talk_html: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTalk((prevTalk) => ({ ...prevTalk, [name]: value }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(",").map((keyword) => keyword.trim());
    setTalk((prevTalk) => ({ ...prevTalk, keywords }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setTalk((prevTalk) => ({ ...prevTalk, created_at: date.toISOString() }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const generatedSlug = `${talk.title
        .toLowerCase()
        .replace(/\s+/g, "-")}-${nanoid(6)}`;

      const response = await storeTalks(
        talk.title || "", // Ensure title is a string
        "", // subtitle
        generatedSlug, // Use the generated slug
        talk.description || "", // Ensure description is a string
        talk.keywords || [],
        talk.image || "",
        "" // image_alt
      );

      if (!response) {
        console.error("Unexpected error publishing talk");
        toast.error("Unexpected error publishing talk");
        return;
      }

      if (response.error) {
        console.error("Error publishing talk:", response.error);
        toast.error(`Error publishing talk: ${response.error}`);
      } else {
        console.log("Talk published:", response.data);
        toast.success("Talk is published");
        setTalk({
          title: "",
          slug: "",
          created_at: new Date().toISOString(),
          location: "",
          description: "",
          presentation_link: "",
          feedback_link: "",
          image: "https://via.placeholder.com/400x200?text=Talk+Image",
          keywords: [],
          talk_html: "",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error publishing talk");
    }
  };

  const handleUploadComplete = (res: any) => {
    console.log("Files: ", res);
    const uploadedFileUrl = res[0].url;
    setTalk((prevTalk) => ({
      ...prevTalk,
      image: uploadedFileUrl,
    }));
    toast(`Image uploaded`);
  };

  const handleUploadError = (error: Error) => {
    toast(`ERROR! ${error.message}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Publish a New Talk
      </h1>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Preview</h2>
          <div className="w-full max-w-sm mx-auto">
            <TalkCard talk={talk} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={talk.title}
                onChange={handleInputChange}
                placeholder="Enter talk title"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={talk.location}
                onChange={handleInputChange}
                placeholder="Enter talk location"
              />
            </div>
            <div>
              <Label htmlFor="created_at">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !talk.created_at && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {talk.created_at ? (
                      format(new Date(talk.created_at), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(talk.created_at)}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={talk.description}
                onChange={handleInputChange}
                placeholder="Enter talk description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                name="keywords"
                value={talk.keywords}
                onChange={handleKeywordsChange}
                placeholder="Enter keywords"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="presentation_link">Presentation Link</Label>
              <Input
                id="presentation_link"
                name="presentation_link"
                value={talk.presentation_link}
                onChange={handleInputChange}
                placeholder="Enter presentation link"
              />
            </div>
            <div>
              <Label htmlFor="feedback_link">Feedback Link</Label>
              <Input
                id="feedback_link"
                name="feedback_link"
                value={talk.feedback_link}
                onChange={handleInputChange}
                placeholder="Enter feedback link"
              />
            </div>
            <div>
              <Label>Talk Image</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                appearance={{
                  button: ({ isUploading }) =>
                    `bg-blue-500 text-white rounded-md px-4 py-2 ${
                      isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }`,
                  allowedContent: "text-gray-600 text-sm",
                }}
                content={{
                  button({ isUploading }) {
                    if (isUploading)
                      return (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      );
                    return "Upload Image";
                  },
                  allowedContent: "Images up to 4MB",
                }}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Publish Talk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

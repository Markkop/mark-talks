"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { deleteTalk } from "@/utils/actions/talks/delete-talk";
import { shareTalk } from "@/utils/actions/talks/share-talk";
import { statusTalks } from "@/utils/actions/talks/status-publish-talk";
import { useGetTalkBySlug } from "@/utils/hooks/useGetTalkBySlug";
import { Talk } from "@/utils/types";
import { ClipboardCheckIcon, Edit, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  params: {
    slug: string;
  };
  response: Talk[];
}

export default function ManageTalk({ params, response }: Props) {
  console.log("params", params);
  console.log("response", response);
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();

  const { data, isPending, refetch } = useGetTalkBySlug(params?.slug);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const shareSetting = data.shareSetting === "true";
    try {
      const response = await shareTalk(params?.slug, shareSetting);
      toast("Talk shareability changed");
      refetch();
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  return (
    <div className="flex justify-end items-center w-full gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline">
            <Share />
          </Button>
        </PopoverTrigger>
        {!isPending && (
          <PopoverContent className="w-80">
            <h4 className="font-medium leading-none">Shareability</h4>
            <Separator className="w-full mt-3" />
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                <RadioGroup
                  defaultValue={data?.[0]?.shareable ? "true" : "false"}
                  {...register("shareSetting")}
                  className="flex flex-col gap-2 py-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="publicOption" />
                    <Label>Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="privateOption" />
                    <Label>Private</Label>
                  </div>
                </RadioGroup>
              }
              <Button type="submit" variant="outline">
                Update
              </Button>
            </form>
            <div className="flex gap-2 mt-4">
              <Input
                defaultValue={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/talk/public/${data?.[0]?.id}`}
              />
              <Button
                size="icon"
                disabled={!data?.[0]?.shareable}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/talk/public/${data?.[0]?.id}`
                  );
                  toast("Public talk url has been copied");
                }}
              >
                <ClipboardCheckIcon />
              </Button>
            </div>
          </PopoverContent>
        )}
      </Popover>

      <Link href={`/cms/preview/${params?.slug}/edit`}>
        <Button size="icon" variant="outline">
          <Edit />
        </Button>
      </Link>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger asChild>
          <Button size="sm">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Talk</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this talk?
            </DialogDescription>
          </DialogHeader>
          <Button
            type="submit"
            size="sm"
            onClick={async () => {
              await deleteTalk(params?.slug);
              setOpenDelete(false);
              router.push("/cms");
            }}
          >
            Yes, Delete
          </Button>
        </DialogContent>
      </Dialog>
      {response?.[0]?.published ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Unpublish</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Unpublish Talk</DialogTitle>
              <DialogDescription>
                Are you sure you want to unpublish this talk?
              </DialogDescription>
            </DialogHeader>
            <Button
              type="submit"
              onClick={async () => {
                await statusTalks(params?.slug, !response?.[0]?.published);
                setOpen(false);
              }}
            >
              Yes, Unpublish
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Publish</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Publish Talk</DialogTitle>
              <DialogDescription>
                Are you sure you want to publish this talk?
              </DialogDescription>
            </DialogHeader>
            <Button
              type="submit"
              onClick={async () => {
                await statusTalks(params?.slug, !response?.[0]?.published);
                setOpen(false);
              }}
            >
              Yes, Publish
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

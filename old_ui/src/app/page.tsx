"use client";
import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon, CameraIcon } from "@radix-ui/react-icons";

import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-uploader";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { AlbumArtwork } from "@/components/album-artwork";
import { Menu } from "@/components/menu";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { Sidebar } from "@/components/sidebar";
import { listenNowAlbums, TrendingImages } from "@/data/albums";
import { playlists } from "@/data/playlists";
import React, { useState } from "react";
import { Radius } from "lucide-react";
// export const metadata: Metadata = {
//   title: "Music App",
//   description: "Example music app using the components.",
// };

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

export default function MusicPage() {
  const [file, setFile] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile) as string);
    }
  }
  const prefix = "@";

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="trending" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="trending" className="relative">
                          Trending
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                        <TabsTrigger value="live">Live</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <PlusCircledIcon className="mr-2 h-4 w-4" />
                              Upload
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Upload!</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Username
                                </Label>
                                <Input
                                  id="username"
                                  placeholder="@"
                                  className="col-span-3"
                                  ref={(target) => {
                                    try {
                                      if (target) {
                                        target.value = prefix;
                                      }
                                    } catch (e) {
                                      console.error(e);
                                    }
                                  }}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    e.target.value =
                                      prefix + input.substring(prefix.length);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Pincode
                                </Label>
                                <InputOTP className="col-span-3" maxLength={6}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              {/* <Separator className="my-4" /> */}
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <center>
                                  <FileUploader
                                    value={files}
                                    onValueChange={setFiles}
                                    dropzoneOptions={dropZoneConfig}
                                    className="relative bg-background rounded-lg p-2"
                                  >
                                    <FileInput className="outline-dashed outline-1 outline-white">
                                      <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                        <FileSvgDraw />
                                      </div>
                                    </FileInput>
                                    <FileUploaderContent>
                                      {files &&
                                        files.length > 0 &&
                                        files.map((file, i) => (
                                          <FileUploaderItem key={i} index={i}>
                                            {/* <Paperclip className="h-4 w-4 stroke-current" /> */}
                                            <span>{file.name}</span>
                                          </FileUploaderItem>
                                        ))}
                                    </FileUploaderContent>
                                  </FileUploader>
                                </center>

                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button variant={"outline"}>Camara Settings</Button>
                                  </DrawerTrigger>
                                  <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm">
                                      <DrawerHeader>
                                        <DrawerTitle>Move Goal</DrawerTitle>
                                        <DrawerDescription>
                                          Set your daily activity goal.
                                        </DrawerDescription>
                                      </DrawerHeader>
                                      <div className="p-4 pb-0">dwa</div>
                                      <DrawerFooter>
                                        <Button>Submit</Button>
                                        <DrawerClose asChild>
                                          <Button variant="outline">
                                            Cancel
                                          </Button>
                                        </DrawerClose>
                                      </DrawerFooter>
                                    </div>
                                  </DrawerContent>
                                </Drawer>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Upload!</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <TabsContent
                      value="trending"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Trending Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="hidden" className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <center>
                            <div
                              style={{
                                display: "grid",
                                justifyContent: "center",
                                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                gridGap: "15px" 

                              }}
                              className=""
                            >
                              {listenNowAlbums.map((album) => (
                                <>
                                  <Drawer snapPoints={[1]}>
                                    <DrawerTrigger asChild>
                                      <div style={{flexDirection: "row", alignItems: "center"}}>
                                      <AlbumArtwork
                                        key={album.name}
                                        album={album}
                                        className="w-[250px]"
                                        aspectRatio="portrait"
                                        width={250}
                                        height={330}
                                        
                                      />
                                      <Badge style={{marginTop: -200}} variant="outline">Badge</Badge>
                                      </div>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                      <div className="mx-auto w-full max-w-sm">
                                        <DrawerHeader>
                                          <DrawerTitle>{album.name}</DrawerTitle>
                                          <DrawerDescription>
                                            {album.cover}
                                          </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="p-4 pb-0">
                                          <div style={{borderRadius: "1rem"}} className="flex items-center justify-center space-x-2">
                                            <img
                                              src={album.cover}
                                              // width={250}
                                              // height={330}
                                              alt={album.name}
                                              style={{borderRadius: "1rem"}}
                                              resizeMode="contain"
                                              
                                            />
                                          </div>
                                        </div>
                                        <DrawerFooter>
                                          {/* <Button>Submit</Button> */}
                                          <DrawerClose asChild>
                                            <Button variant="outline">
                                              Close
                                            </Button>
                                          </DrawerClose>
                                        </DrawerFooter>
                                      </div>
                                    </DrawerContent>
                                  </Drawer>
                                </>
                              ))}
                            </div>
                          </center>
                          {/* <ScrollBar orientation="horizontal" /> */}
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import check from "@/img/verified.gif";
import Image from "next/image";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [resizedImage, setResizedImage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const mutation = useMutation({
    mutationFn: (data) =>
      axios.post("https://resize-image-wu2j.onrender.com/upload_image", data,{
        responseType: 'arraybuffer',
      }),
    onSuccess: (data) => {
      const blob = new Blob([data.data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setResizedImage(url);
      setIsDownload(true);
      setIsShow(true);
      setTimeout(() => {
        setIsShow(false);
      }, 2000);
    },
    onError: () => {
      console.log("Error");
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("largeur", width);
    formData.append("hauteur", height);
    formData.append("file", selectedFile as File);
    // @ts-ignore
    mutation.mutate(formData);
  };

  const handleDownload = () => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.href = resizedImage;
      link.download = 'image_redimensionnee.png'; // Nom du fichier à télécharger
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Aucune image redimensionnée disponible pour le téléchargement.');
    }
  };

  return (
    <>
      {mutation.isPending && <Loader />}
      {isShow && <ModalSuccess />}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload d'image</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="largeur">Largeur</Label>
                  <Input
                    id="largeur"
                    type="text"
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hauteur">Hauteur</Label>
                  <Input
                    id="hauteur"
                    type="text"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Sélectionnez une image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 flex-col">
            <Button type="submit" className="w-full" disabled={!selectedFile}>
              Resize
            </Button>
            {isDownload && (
              <Button type="submit" onClick={handleDownload} className="w-full" variant="outline">
                Download
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

function ModalSuccess() {
  return (
    <div className="absolute top-0 left-0 bg-black/65 w-full h-full flex justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <Card className="w-[350px] overflow-hidden">
            <CardHeader>
              {/* <CardTitle className="uppercase">Terminé!</CardTitle> */}
            </CardHeader>
            <CardContent className="relative flex justify-center">
              <Image alt="" src={check} width={200} height={200} />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

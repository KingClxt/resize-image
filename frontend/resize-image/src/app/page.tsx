/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile) {
      alert("Veuillez sélectionner une image")
      return
    }

    // Ici, vous implémenteriez la logique réelle d'upload
    // Par exemple, en utilisant une API ou un service de stockage
    console.log("Uploading file:", selectedFile.name)

    // Simulons une requête d'upload
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Image uploadée avec succès !")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload d'image</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Sélectionnez une image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Aperçu"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" disabled={!selectedFile}>
            Uploader
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}


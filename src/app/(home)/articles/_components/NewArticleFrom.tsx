"use client";

import { ChangeEvent, useState } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";

import { MdClose } from "react-icons/md";

import CKEdite from "../../../../components/ui/CKEdite";
import MainInput from "src/src/components/ui/MainInput";
import ToggleButton from "src/src/components/ui/ToggleButton";
import Model from "src/src/components/Model/Model";
import SelectInput from "src/src/components/ui/SelectInput";

import { Article, useArticles } from "src/src/stores/Article-store/Articles-store";
import { getFileUrl } from "src/src/utils/helper";

// Demo data
const Categories = ["Article", "Post", "Short post"];
const tages = ["News", "Personal","releas"];

export default function NewArticleFrom() {

  const createArticle = useArticles(state => state.createArticle)
  const { register, handleSubmit } = useForm<Omit<Article, "id">>();

  // single state for each complex data 
  const [coverUrl,setCoverUrl] = useState<string | null>(null)
  const [isPublidhed,setIsPublidhed] = useState<boolean>(false)
  const [selectedTages,setSelectedTages] = useState<string[]>([])
  const [richText,setRichText] = useState<string>('')


  const onSubmit: SubmitHandler<Omit<Article, "id">> = (data) => {

    const articleBody: Article  = {
      id: 0,
      ...data,
      tages: selectedTages,
      published: isPublidhed,
      richText,
      cover: coverUrl ?? ''
    }

    createArticle(articleBody)
  };

  function handleMultiChooiseSelect(selectedTage: string) {
    
    const newTages: string[] = selectedTages.filter((tage) => tage != selectedTage);
    
    // If the tage doesn't exisit
    if (newTages?.length === selectedTages?.length) {
      setSelectedTages([...newTages, selectedTage]);
    } else {
      setSelectedTages(newTages);
    }
  }

   const handleFileSelceted = async (
     selectedFiles: ChangeEvent<HTMLInputElement>    
   ) => {

     // If there is no file selected
    if(!selectedFiles?.target?.files)
      return 

    const url = await getFileUrl(selectedFiles?.target?.files[0])
    setCoverUrl(url)

   };

  return (
    <Model>
      <Model.Open opens="new-article">
        <button className="px-4 py-1 rounded-md text-white bg-amber-200 float-end">
          New article
        </button>
      </Model.Open>
      <Model.Window name="new-article">
        <form
          className="p-4 w-fit bg-amber-200 rounded-md overflow-auto max-h-[90%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-1">
            <MainInput
              label="Title"
              type="text"
              placeHolder="Article title"
              required
              {...register("title")}
            />
            <MainInput
              label="Cover image"
              type="file"
              placeHolder="Article title"
              required
              {...register("cover")}
              onChange={e => handleFileSelceted(e)}
            />
          </div>

          <div className="flex flex-col md:flex-row  gap-2">
            <SelectInput
              label="Category"
              values={Categories}
              {...register("category")}
            />

            <MainInput
              label="Date"
              type="Date"
              placeHolder="Article date"
              required
              {...register("scheduled")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <SelectInput
              label="Tages"
              onChange={(e: any) => handleMultiChooiseSelect(e.target.value)}
              values={tages}
              multiSelect={selectedTages}
            />
            <div>
              <label className="text-left text-white font-bold">
                Published
              </label>
              <ToggleButton
                value={isPublidhed}
                onChangeFn={() =>
                  setIsPublidhed(last => !last)
                }
              />
            </div>
          </div>
          <CKEdite setRichText={setRichText} />
          <button className="px-2 py-1 rounded-md bg-white text-amber-200 mt-2 cursor-pointer">Add</button>
        </form>
      </Model.Window>
    </Model>
  );
}

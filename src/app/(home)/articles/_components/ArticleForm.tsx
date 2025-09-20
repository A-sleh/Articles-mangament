"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import CKEdite from "@/components/ui/CKEdite";
import MainInput from "@/components/ui/MainInput";
import ToggleButton from "@/components/ui/ToggleButton";
import Model from "@/components/Model/Model";
import SelectInput from "@/components/ui/SelectInput";

import { getFileUrl } from "@/utils/helper";
import { Article, useArticles } from "@/stores/Article-store/Articles-store";

// Demo data
const Categories = ["Article", "Post", "Short post"];
const tages = ["News", "Personal", "releas"];

const localIntialForm = {
  id: 0,
  title: "",
  category: "",
  tages: [],
  cover: null,
  published: false,
  scheduled: '',
  richText: "",
};

export default function ArticleForm({
  intialForm,
  method,
  children
}: {
  intialForm?: Article;
  method: 'POST' | 'PUT';
  children: React.ReactElement
}) {
  const {createArticle,updateArticle} = useArticles((state) => state);

  // single state for each complex data
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [form, setForm] = useState<Article>(intialForm ?? localIntialForm);


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(method === 'POST') {

      createArticle(form);
      return 
    }
    // For PUT request
    updateArticle(form.id,form)
    
  };

  function handleMultiChooiseSelect(selectedTage: string) {
    const newTages: string[] = form?.tages?.filter(
      (tage) => tage != selectedTage
    ) || [];

    // If the tage doesn't exisit
    if (newTages?.length === form.tages?.length) {
      setForm({ ...form, tages: [...newTages, selectedTage] });
    } else {
      setForm({ ...form, tages: newTages });
    }
  }

  const handleFileSelceted = async (
    selectedFiles: ChangeEvent<HTMLInputElement>
  ) => {

    // If there is no file selected
    if (!selectedFiles?.target?.files) return;

    setCoverUrl(selectedFiles?.target?.value)

    const url = (await getFileUrl(selectedFiles?.target?.files[0])) ?? "";
    setForm({ ...form, cover: url });
  };

  return (
    <Model>
      <Model.Open opens="new-article">
        {children}
      </Model.Open>
      <Model.Window name="new-article">
        <form
          className="p-4  bg-amber-200 rounded-md overflow-auto max-h-[90%]"
          onSubmit={(e) =>  onSubmit(e)}
        >
          <div className="flex flex-col md:flex-row gap-1">
            <MainInput
              label="Title"
              type="text"
              placeHolder="Article title"
              required={true}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <MainInput
              label="Cover image"
              type="file"
              placeHolder="Article title"
              required={true}
              onChange={(e) => handleFileSelceted(e)}
              value={coverUrl || null}
            />
          </div>

          <div className="flex flex-col md:flex-row  gap-2">
            <SelectInput
              label="Category"
              values={Categories}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <MainInput
              label="Date"
              type="Date"
              placeHolder="Article date"
              required={true}
              value={form?.scheduled.toString() || ''}
              onChange={(e) =>
                setForm({ ...form, scheduled: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <SelectInput
              label="Tages"
              onChange={(e: any) => handleMultiChooiseSelect(e.target.value)}
              values={tages}
              multiSelect={form.tages}
            />
            <div>
              <label className="text-left text-white font-bold">
                Published
              </label>
              <ToggleButton
                value={form.published}
                onChangeFn={() =>
                  setForm({ ...form, published: !form.published })
                }
              />
            </div>
          </div>
          <CKEdite setRichText={(data) => setForm({...form,richText: data})} initalValue={form.richText} />
          <button className="px-2 py-1 rounded-md bg-white text-amber-200 mt-2 cursor-pointer">
            Confirm
          </button>
        </form>
      </Model.Window>
    </Model>
  );
}

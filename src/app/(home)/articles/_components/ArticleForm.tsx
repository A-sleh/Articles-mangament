"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import CKEdite from "@/components/ui/CKEdite";
import MainInput from "@/components/ui/MainInput";
import FileInput from "@/components/ui/FileInput";
import ToggleButton from "@/components/ui/ToggleButton";
import Model from "@/components/Model/Model";
import SelectInput from "@/components/ui/SelectInput";

import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";
import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";

// Demo data
const Categories = ["Article", "Post", "Short post"];
const tages = ["News", "Personal", "releas"];

const localIntialForm: IArticle = {
  id: 0,
  title: "",
  category: "",
  tages: [],
  cover: "",
  published: false,
  scheduled: "",
  richText: "",
  localUrl: "",
};

export default function ArticleForm({
  intialForm,
  method,
  children,
}: {
  intialForm?: IArticle;
  method: "POST" | "PUT";
  children: React.ReactElement;
}) {
  const [form, setForm] = useState<IArticle>(intialForm ?? localIntialForm);
  const { createArticle, updateArticle } = useArticles((state) => state);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (method === "POST") {
      await createArticle(form);
      successToast("Article was Added as successfuly");
      setForm(localIntialForm); // Reset the article form after created
      return;
    }
    // For PUT request
    await updateArticle(form.id, form);
    successToast("Article was updated as successfuly");
  };

  function handleMultiChooiseSelect(selectedTage: string) {
    const newTages: string[] =
      form?.tages?.filter((tage) => tage != selectedTage) || [];

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

    const localUrl = selectedFiles.target.value.toString();
    
    try {

      const url = (await getFileUrl(selectedFiles?.target?.files[0])) ?? "";
       setForm((lastForm) => ({ ...lastForm, cover: url, localUrl }));
    }catch(err) {
      errorToast((err as Error).message)
    }

  };

  return (
    <Model>
      <Model.Open opens="new-article">{children}</Model.Open>
      <Model.Window name="new-article">
        <form
          style={{ scrollbarWidth: "none" }}
          className="p-4 bg-secondary dark:bg-secondary-dark dark:shadow-md dark:shadow-white/30 rounded-md rounded-tl-none overflow-auto max-h-[90vh] w-[90vw] md:w-full"
          onSubmit={(e) => onSubmit(e)}
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
            <FileInput
              label="Cover image"
              placeHolder="select cover image"
              onChange={(e) => handleFileSelceted(e)}
              value={form.localUrl}
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
              value={form?.scheduled.toString() || ""}
              onChange={(e) => setForm({ ...form, scheduled: e.target.value })}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <SelectInput
              label="Tages"
              onChange={(e: any) => handleMultiChooiseSelect(e.target.value)}
              values={tages}
              multiSelect={form.tages}
            />
            <div className="mb-2">
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
          <div className="overflow-auto" style={{ scrollbarWidth: "none" }}>
            <CKEdite
              setRichText={(data) => setForm({ ...form, richText: data })}
              initalValue={form.richText}
            />
          </div>
          <button className="px-2 py-1 rounded-md bg-white text-primary dark:text-primary-dark mt-2 cursor-pointer">
            Confirm
          </button>
        </form>
      </Model.Window>
    </Model>
  );
}

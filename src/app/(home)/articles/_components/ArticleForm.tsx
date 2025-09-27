"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import CKEdite from "@/components/ui/CKEdite";
import MainInput from "@/components/ui/MainInput";
import FileInput from "@/components/ui/FileInput";
import ToggleButton from "@/components/ui/ToggleButton";
import Model from "@/components/Model/Model";
import SelectInput from "@/components/ui/SelectInput";

import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";
import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";

const Categories = ["Article", "Post", "Short post"];
const tags = ["News", "Personal", "Release"];

const localInitialForm: IArticle = {
  id: 0,
  title: "",
  category: "",
  tags: [],
  cover: "",
  published: false,
  scheduled: "",
  richText: "",
  localUrl: "",
};

export default function ArticleForm({
  initialForm,
  method,
  children,
}: {
  initialForm?: IArticle;
  method: "POST" | "PUT";
  children: React.ReactElement;
}) {
  const t = useTranslations('articles.article-form');
  console.log(initialForm)

  const [form, setForm] = useState<IArticle>(initialForm ?? localInitialForm);
  const { createArticle, updateArticle } = useArticles((state) => state);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (method === "POST") {
        await createArticle(form);
        successToast(t("success-add"));
        setForm(localInitialForm);
        return;
      }
      await updateArticle(form.id, form);
      successToast(t("success-update"));
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  function handleMultiChoiceSelect(selectedTag: string) {
    const newTags: string[] =
      form?.tags?.filter((tag) => tag !== selectedTag) || [];

    if (newTags.length === form.tags.length) {
      setForm({ ...form, tags: [...newTags, selectedTag] });
    } else {
      setForm({ ...form, tags: newTags });
    }
  }

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const localUrl = e.target.value.toString();

    try {
      const url = (await getFileUrl(e.target.files[0])) ?? "";
      setForm((prev) => ({ ...prev, cover: url, localUrl }));
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <Model>
      <Model.Open opens="new-article">{children}</Model.Open>
      <Model.Window name="new-article">
        <form
          style={{ scrollbarWidth: "none" }}
          className="p-4 bg-secondary dark:bg-secondary-dark dark:shadow-md dark:shadow-white/30 rounded-md rounded-tl-none overflow-auto max-h-[90vh] w-[90vw] md:w-full"
          onSubmit={onSubmit}
          dir='rtl'
        >
          <div className="flex flex-col md:flex-row gap-1">
            <MainInput
              label={t("title")}
              type="text"
              placeHolder={t("title-placeholder")}
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <FileInput
              label={t("cover-image")}
              placeHolder={t("cover-image-placeholder")}
              onChange={handleFileSelected}
              value={form.localUrl}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <SelectInput
              label={t("category")}
              values={Categories}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form.category}
            />

            <MainInput
              label={t("date")}
              type="date"
              placeHolder={t("date-placeholder")}
              required
              value={form.scheduled || ""}
              onChange={(e) => setForm({ ...form, scheduled: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <SelectInput
              label={t("tags")}
              onChange={(e) => handleMultiChoiceSelect(e.target.value)}
              values={tags}
              multiSelect={form.tags}
            />
            <div className="mb-2">
              <label className="text-left text-white font-bold">
                {t("published")}
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
            {t("confirm")}
          </button>
        </form>
      </Model.Window>
    </Model>
  );
}

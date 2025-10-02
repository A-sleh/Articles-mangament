"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import CKEdite  from "@/components/ui/CKEdite";
import MainInput from "@/components/ui/MainInput";
import FileInput from "@/components/ui/FileInput";
import ToggleButton from "@/components/ui/ToggleButton";
import Model from "@/components/Model/Model";
import SelectInput from "@/components/ui/SelectInput";

import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";
import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";
import { MdClose } from "react-icons/md";

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
  const t = useTranslations("articles.article-form");

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
          className="p-3 bg-white dark:bg-gray-900 shadow-xl rounded-lg max-h-[90vh] w-[90vw] md:w-full overflow-y-auto no-scrollbar transition-all duration-300"
          onSubmit={onSubmit}
        >
          <Model.Close>
            <button className="flex justify-end w-full p-1 cursor-pointer ">
              <MdClose size={24} />
            </button>
          </Model.Close>
          {/* Title and Image */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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

          {/* Category & Date */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              value={form?.scheduled || ""}
              onChange={(e) => setForm({ ...form, scheduled: e.target.value })}
            />
          </div>

          {/* Tags and Published */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SelectInput
              label={t("tags")}
              onChange={(e) => handleMultiChoiceSelect(e.target.value)}
              values={tags}
              multiSelect={form.tags}
            />

            <div className="flex flex-col gap-2 justify-end">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
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

          {/* Rich Text Editor */}
          <div className="mb-6 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
            <div className="overflow-auto" style={{ scrollbarWidth: "none" }}>
              <CKEdite
                setRichText={(data) => setForm({ ...form, richText: data })}
                initalValue={form.richText}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 rounded-md bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
          >
            {t("confirm")}
          </button>
        </form>
      </Model.Window>
    </Model>
  );
}

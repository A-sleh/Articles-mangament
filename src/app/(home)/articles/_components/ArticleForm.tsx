"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import DatePicker from "react-datepicker";
import CKEdite from "@/components/ui/CKEdite";
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

const localInitialForm: Omit<IArticle, "views"> = {
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

  const [form, setForm] = useState<Omit<IArticle, "views">>(
    initialForm ?? localInitialForm
  );
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

  const handleAdd = (val: string) => {
    if (!form.tags.includes(val)) {
      setForm({...form, tags: [...form.tags, val]});
    }
  };

  const handleRemove = (val: string) => {
    setForm({ ...form, tags: form.tags.filter((v) => v !== val) });
  };

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
          className="p-3 px-5 bg-white dark:bg-primary-dark shadow-xl rounded-lg max-h-[90vh] w-[90vw] md:w-full overflow-y-auto no-scrollbar transition-all duration-300"
          onSubmit={onSubmit}
          style={{}}
        >
          <Model.Close>
            <button className="flex justify-end w-full p-1 cursor-pointer dark:text-white ">
              <MdClose size={24} />
            </button>
          </Model.Close>
          {/* Title and Image */}
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <MainInput
              label={t("title")}
              type="text"
              placeHolder={t("title-placeholder")}
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <div className="mb-1 flex flex-col w-full">
              <label className="text-primary dark:text-white mb-1">
                {t("date")}
              </label>
              <DatePicker
                className="px-4 py-2 bg-white w-full text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-white dark:border dark:border-white outline-hidden shadow-sm rounded-sm"
                selected={form.scheduled}
                placeholderText={t("date-placeholder")}
                onChange={(date) => setForm({ ...form, scheduled: date })}
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <SelectInput
              label={t("category")}
              values={Categories}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form?.category || Categories[0]}
            />

            <FileInput
              label={t("cover-image")}
              placeHolder={t("cover-image-placeholder")}
              onChange={handleFileSelected}
              value={form.localUrl}
            />
          </div>

          {/* Tags and Published */}
          <div className="flex flex-col md:flex-row gap-1 mb-2">
            <SelectInput
              label={t("tags")}
              onChange={(e) =>
                handleAdd(e.target.value)
              }
              values={tags}
              multiSelect={form.tags}
              onRemoveElement={handleRemove}
            />

            <div className="flex items-center gap-2 justify-end">
              <ToggleButton
                value={form.published}
                buttonStyle="w-[20px] h-[20px]"
                onChangeFn={() =>
                  setForm({ ...form, published: !form.published })
                }
              />
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200 text-nowrap">
                {t(form.published ? "published" : 'un-published')}
              </label>
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

/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoRgDANARATAdAdjgVitAbOgLOkBmATgIQA4CYsDkF0YwEbkw8FKx09tmY0oBTAHZoQEUBEiQRkgLrRWAMzAwAJiSjSgA===
 */
"use client"

import { useState, useEffect, useRef, useMemo, SetStateAction } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODk1MTY3OTksImp0aSI6IjcyOTI3YjY0LTg1ZTgtNDQzNC05YmY5LTUyNWQ4NzEzOTUxYyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiMzBiNWJmYjcifQ.BPLqCDqUU0KwyC82FiPeOCspK1vcbRFW2VAkocCriVfZZF7eCv4rgkIMtj8DdJxWVLWTny7AygreE_kji0Rn-Q";

export default function CKEdite({
  setRichText,
  initalValue,
}: {
  setRichText: React.Dispatch<SetStateAction<string>>;
  initalValue: string;
}) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "46.1.1" });

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { InlineEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      InlineEditor,
      Autosave,
      Bold,
      Essentials,
      ImageInsertViaUrl,
      Italic,
      Link,
      List,
      Paragraph,
      Underline,
    } = cloud.CKEditor;

    return {
      InlineEditor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertImageViaUrl",
            "|",
            "bulletedList",
            "numberedList",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autosave,
          Bold,
          Essentials,
          ImageInsertViaUrl,
          Italic,
          Link,
          List,
          Paragraph,
          Underline,
        ],
        initialData:
          '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        placeholder: "Type or paste your content here!",
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <div className="main-container z-[100]">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor ">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                config={editorConfig}
                onChange={(_, e) => {
                  setRichText(e.getData());
                }}
                data={initalValue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck
"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';



const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODk1MTY3OTksImp0aSI6IjcyOTI3YjY0LTg1ZTgtNDQzNC05YmY5LTUyNWQ4NzEzOTUxYyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiMzBiNWJmYjcifQ.BPLqCDqUU0KwyC82FiPeOCspK1vcbRFW2VAkocCriVfZZF7eCv4rgkIMtj8DdJxWVLWTny7AygreE_kji0Rn-Q';

// @ts-nocheck
export default function CKEdite() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const cloud = useCKEditorCloud({ version: '47.0.0' });

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { InlineEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const { InlineEditor, Autosave, Essentials, Paragraph, Bold, Italic, List, Underline, Heading } = cloud.CKEditor;

		return {
			InlineEditor,
			editorConfig: {
				toolbar: {
					items: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList'],
					shouldNotGroupWhenFull: false
				},
				plugins: [Autosave, Bold, Essentials, Heading, Italic, List, Paragraph, Underline],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				initialData:
					"<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou've successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What's next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor's\n\t\tconfiguration to match your application's style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don't hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<p>\n\t<i>An editor without the </i><code>Link</code>\n\t<i>plugin? That's brave! We hope the links below will be useful anyway </i>😉\n</p>\n<ul>\n\t<li>📝 Trial sign up: https://portal.ckeditor.com/checkout?plan=free,</li>\n\t<li>📕 Documentation: https://ckeditor.com/docs/ckeditor5/latest/installation/index.html,</li>\n\t<li>⭐️ GitHub (star us if you can!): https://github.com/ckeditor/ckeditor5,</li>\n\t<li>🏠 CKEditor Homepage: https://ckeditor.com,</li>\n\t<li>🧑‍💻 CKEditor 5 Demos: https://ckeditor.com/ckeditor-5/demo/</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser's\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n",
				licenseKey: LICENSE_KEY,
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [cloud, isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_inline-editor" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>{InlineEditor && editorConfig && <CKEditor editor={InlineEditor} config={editorConfig} />}</div>
				</div>
			</div>
		</div>
	);
}

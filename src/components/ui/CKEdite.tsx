// @ts-nocheck
"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';



const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODk1MTY3OTksImp0aSI6IjcyOTI3YjY0LTg1ZTgtNDQzNC05YmY5LTUyNWQ4NzEzOTUxYyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiMzBiNWJmYjcifQ.BPLqCDqUU0KwyC82FiPeOCspK1vcbRFW2VAkocCriVfZZF7eCv4rgkIMtj8DdJxWVLWTny7AygreE_kji0Rn-Q';

// @ts-nocheck
export default function CKEdite({setRichText,initalValue,placeholder}: {
	setRichText: (data: string) => void
	initalValue: string;
	placeholder?: string;
}) {
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
				initialData: initalValue,
				licenseKey: LICENSE_KEY,
				placeholder: placeholder
			}
		};
	}, [cloud, isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_inline-editor" ref={editorContainerRef}>
				<div className="editor-container__editor dark:text-white">
					<div ref={editorRef}>{InlineEditor && editorConfig && <CKEditor editor={InlineEditor} onChange={(_,edirtor) => setRichText(edirtor.getData())} config={editorConfig} />}</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: "profilePicture";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
	const fileType = value?.split(".").pop();
	if (value && fileType !== "pdf") {
		return (
			<div className="relative h-36 w-36">
				<Image
					fill
					src={value}
					alt="upload"
					className="rounded-full object-cover"
				/>
				<button
					onClick={() => onChange("")}
					className="bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm"
					type="button"
				>
					<X className="h-6 w-6" />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		/>
	);
};

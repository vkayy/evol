import { currentUser } from "@/lib/actions";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
	const user = await currentUser();
	if (!user) {
		throw new Error("Unauthorised");
	}
	return user;
};

export const ourFileRouter = {
	profilePicture: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.middleware(async () => await handleAuth())
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import { currentProfile, currentSession } from "@/lib/actions";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
	try {
		const current = await currentProfile();

		if (!current) {
			return new NextResponse("Unauthorised", { status: 401 });
		}

		if (!params.id) {
			return new NextResponse("ID Missing", { status: 400 });
		}

		const profile = await db.profile.findUnique({
			where: {
				id: params.id,
			},
		});

		if (!profile) {
			return new NextResponse("Profile Not Found", { status: 404 });
		}

		return NextResponse.json(profile);
	} catch (error) {
		console.log("[ID_GET]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const current = await currentProfile();

		if (!current) {
			return new NextResponse("Unauthorised", { status: 401 });
		}

		if (!params.id) {
			return new NextResponse("ID Missing", { status: 400 });
		}

		const { name, imageUrl } = await req.json();

		if (!name) {
			return new NextResponse("Name Missing", { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse("Image URL Missing", { status: 400 });
		}

		const profile = await db.profile.update({
			where: {
				id: params.id,
			},
			data: {
				name,
				imageUrl,
			},
		});

		if (!profile) {
			return new NextResponse("Profile Not Found", { status: 404 });
		}

		return NextResponse.json(profile);
	} catch (error) {
		console.log("[ID_PATCH]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

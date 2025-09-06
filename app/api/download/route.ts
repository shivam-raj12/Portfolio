import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const url = searchParams.get('url') || ''
		const filename = searchParams.get('filename') || 'app.apk'

		if (!url) {
			return NextResponse.json({ error: 'Missing url' }, { status: 400 })
		}


		// ✅ Fetch the actual file
		const upstream = await fetch(url)
		if (!upstream.ok) {
			return NextResponse.json({ error: 'Failed to fetch file' }, { status: 502 })
		}

		if (!upstream.body) {
			return NextResponse.json({ error: 'No file content' }, { status: 502 })
		}

		// ✅ Prepare download response
		const headers = new Headers(upstream.headers)
		headers.set('Content-Disposition', `attachment; filename="${filename}"`)
		headers.set('Content-Type', 'application/vnd.android.package-archive')

		return new Response(upstream.body, {
			status: 200,
			headers,
		})
	} catch (error) {
		console.error('Download route error:', error)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}

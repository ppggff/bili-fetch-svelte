import { createFFmpeg, type FFmpeg } from '@ffmpeg/ffmpeg';
import { error } from '@sveltejs/kit';

const ffmpeg = createFFmpeg({
	corePath: 'https://unpkg.zhimg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
	log: true
}) as FFmpeg;

export async function loadFFmpeg(): Promise<FFmpeg> {
	try {
		await ffmpeg.load();
	} catch (e) {
		if (
			typeof e === 'object' &&
			e !== null &&
			'message' in e &&
			e.message === 'SharedArrayBuffer is not defined'
		) {
			throw Error('请使用最新版Chrome浏览器');
		}
	}
	return ffmpeg;
}

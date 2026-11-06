// TTransport manual — screenshot lightbox (no dependencies).
//
// Content screenshots are markdown images wrapped in links pointing at the
// raw .webp asset; clicking them used to navigate away from the docs. This
// intercepts those clicks and opens the image in a shared <dialog> instead.
// Esc closes natively; clicking anywhere outside the image closes too.
document.addEventListener('click', (event) => {
	const link = event.target.closest('a[href$=".webp"]');
	if (!link || !link.querySelector('img')) return;
	event.preventDefault();
	openLightbox(link.href);
});

let dialog;

function openLightbox(src) {
	if (!dialog) {
		dialog = document.createElement('dialog');
		dialog.className = 'img-lightbox';
		dialog.setAttribute('aria-label', 'Xem ảnh lớn');
		const img = document.createElement('img');
		img.alt = '';
		dialog.append(img);
		dialog.addEventListener('click', (event) => {
			// Clicks on the dialog element itself (padding/backdrop area) close;
			// clicks on the image do not.
			if (event.target !== img) dialog.close();
		});
		document.body.append(dialog);
	}
	dialog.querySelector('img').src = src;
	dialog.showModal();
}

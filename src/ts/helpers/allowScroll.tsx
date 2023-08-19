const scrollClass = '__allow-scroll';

export function AddScroll() {
    document.getElementsByTagName('body')[0].classList.add(scrollClass);
}

export function RemoveScroll() {
    document.getElementsByTagName('body')[0].classList.remove(scrollClass);
}

/**
 * @param {string} dateString - ISO 날짜 문자열
 * @param {string} locale - 'ko-KR', 'en-US', 'ja-JP' 등. 미생략 시 브라우저 기본 locale 사용
 * @param {object} options - Intl.DateTimeFormat 옵션 오버라이드
 */
export const formatDate = (dateString, locale = navigator.language, options = {}) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const defaultOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};
/*
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
};*/

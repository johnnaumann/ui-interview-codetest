export const router = {
  pathname: '/dashboard',
  searchParams: new URLSearchParams(),
  navigate: (url: string | URL) => {
    const path = typeof url === 'string' ? url : url.pathname;
    console.log('Navigating to:', path);
  },
};

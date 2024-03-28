const useCookies = () => {
  const setCookie = (name: string, value: string) => {
    try {
      let date = new Date(Date.now() + 7200e3).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date};`;
    } catch (error) {
      console.log(error);
    }
  };
  const getCookie = (name: string) => {
    try {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCookie = (name: string) => {
    try {
      document.cookie = `${name}=${null};expires=${null}`;
    } catch (error) {
      console.error(error);
    }
  };

  return { setCookie, getCookie, deleteCookie };
};

export default useCookies;

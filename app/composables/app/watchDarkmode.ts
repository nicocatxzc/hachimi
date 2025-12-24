export default  function watchDarkmode () {
    const darkmode = useDarkmodeStore();
    // 自动更新主题
    return watch(
        () => darkmode.state,
        () => {
            if (darkmode.state) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
        { immediate: true }
    );
};

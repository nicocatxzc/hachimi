// export default defineEventHandler(async (event) => {
export default defineEventHandler(async () => {
    return {
        // 基础设置
        siteIcon: "", //站点logo
        seoKeyword: "", // seo关键词
        seoDesc: "", // seo描述

        // 主题配色
        wordColor: "#505050", // 文字颜色
        activeColor: "#00b0f0", // 链接悬浮颜色
        widgetTransparency: 0.8, // 组件透明度
        backgroundTransparency: 0.8, // 背景透明度
        wordColorDark: "#CCCCCC", // 深色模式文字颜色
        activeColorDark: "#FCCD00", // 深色模式链接悬浮颜色
        widgetTransparencyDark: 0.8, // 深色模式组件透明度
        backgroundTransparencyDark: 0.7, // 深色模式背景透明度
        imgBrightDark: 0.8, // 深色模式图像亮度
        // 字体相关
        globalFontWeight:300,
        globalFontSize:16,
        extraFonts:[
            {
                fontName:"方正喵呜",
                link:"https://files.nicocat.cc/wp-content/uploads/2024/12/miaowu.woff2"
            },
            {
                fontName:"小赖",
                link:"https://files.nicocat.cc/wp-content/uploads/2024/11/XiaolaiMonoSC-Regular.woff2"
            }
        ],
        // 导航栏
        navLogo: "https://nicocat.cc/wp-content/uploads/2025/11/avatar.png", // 导航栏logo
        navTitle: "猫猫王", // 导航栏标题
        navTitleFont: "方正喵呜", //导航栏标题字体
        font: "小赖", // 导航栏字体
        navbar: {
            distribution: "right", // 导航栏选项位置
            margin: "15" // 导航栏选项间距
        },
        // 页尾
        footerSakura:true,
        footerFont:"小赖",
        footerHTML:`<span>html</span>`,

        // 其他
        topScrollProgress:true,
        topLoadingProgress:true,
        pageAutoLoad:3,
        missingImgPlaceholder:"https://files.moecat.cc/sakurairo/basic/friendlink.jpg",
        missingAvatarPlaceholder:"https://files.moecat.cc/sakurairo/basic/image-404.png",
        paginationAnimation:"",
        loadingAnimation:"",

        // 首页封面
    };
});

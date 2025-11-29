type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

type Color = HexColor | RGBColor | RGBAColor;

export interface ThemeConfig {
    siteIcon:String,
    seoKeyword:"",
    seoDesc:"",
    wordColor:Color,
    activeColor:Color,
    wordColorDark:Color,
    activeColorDark:Color,
    navbar: {
        distribution: "left" | "center" | "right" ,
        margin: Number,
    },
}
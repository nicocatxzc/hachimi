import useWP from "../utils/useWP";

export default defineEventHandler(async (event) => {
    let res = await useWP.get("/wp-json/wp-api-menus/v2/menus/182");

    return res.data;
});

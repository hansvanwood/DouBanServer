package com.example.movie.common;

import java.util.List;

/**
 * 电影筛选条件常量类
 */
public class MovieFilterConstants {

    /**
     * 地区（开发环境）
     */
    public static final List<String> DEV_REGIONS = List.of(
            "中国", "美国", "日本", "韩国", "英国", "泰国",
            "印度", "德国", "西班牙", "澳大利亚");

    /**
     * 地区（生产环境）
     * 生产环境下支持全球的国家和地区
     */
    public static final List<String> PROD_REGIONS = List.of(
            "中国大陆", "美国", "日本", "韩国", "中国香港", "中国台湾", "英国", "法国", "德国", "意大利",
            "西班牙", "印度", "泰国", "俄罗斯", "伊朗", "加拿大", "澳大利亚", "爱尔兰", "瑞典", "巴西", "丹麦");

    /**
     * 语言（开发环境）
     */
    public static final List<String> DEV_LANGUAGES = List.of(
            "汉语普通话", "英语", "日语", "西班牙语", "葡萄牙语", "韩语", "泰语", "印地语",
            "法语", "德语", "意大利语", "粤语", "拉丁语", "俄语", "挪威语", "荷兰语", "手语");

    /**
     * 语言（生产环境）
     * 生产环境下支持全球的语言
     */
    public static final List<String> PROD_LANGUAGES = List.of(
            "汉语普通话", "英语", "日语", "法语", "韩语", "德语", "西班牙语", "俄语", "意大利语",
            "粤语", "葡萄牙语", "印地语", "泰语", "阿拉伯语", "波斯语", "荷兰语", "波兰语",
            "瑞典语", "丹麦语", "芬兰语", "挪威语", "土耳其语", "希腊语", "希伯来语", "藏语",
            "蒙古语", "维吾尔语", "手语", "拉丁语", "世界语");

    /**
     * 电影类型（开发环境）
     */
    public static final List<String> DEV_TYPES = List.of(
            "喜剧", "科幻", "动作", "奇幻", "冒险", "战争", "剧情", "动画", "爱情", "悬疑",
            "犯罪", "惊悚", "传记", "运动", "歌舞", "家庭", "音乐", "历史", "灾难", "真人秀");

    /**
     * 电影类型（生产环境）
     */
    public static final List<String> PROD_TYPES = List.of(
            "剧情", "奇幻", "冒险", "家庭", "爱情", "同性", "动作", "犯罪", "音乐", "惊悚",
            "动画", "歌舞", "科幻", "喜剧", "儿童", "历史", "战争", "悬疑", "传记",
            "西部", "恐怖", "古装", "武侠", "灾难", "黑色电影", "运动", "惊栗", "荒诞", "悬念",
            "戏曲", "记录", "Adult", "Reality-TV", "Comedy", "纪录片", "短片", "懸疑 Mystery",
            "舞台艺术", "鬼怪", "真人秀", "劇情 Drama", "驚悚 Thriller", "紀錄片 Documentary",
            "音樂 Music", "News", "脱口秀", "傳記 Biography", "愛情 Romance", "動作 Action",
            "Talk-Show", "動畫 Animation", "兒童 Kids", "喜劇 Comedy", "歷史 History");
}

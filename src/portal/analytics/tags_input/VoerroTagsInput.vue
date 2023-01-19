<template>
    <div class="tags-input-root" style="position: relative;width:100%">
        <div :class="{
            [wrapperClass + ' tags-input']: true,
            'active': isActive,
        }">
             <!-- <i class="fa fa-search" style=" padding: 4px;"></i>  -->
             <span style="padding-left: 3px" v-html="search_icon_svg"></span>
             <!-- {{search_icon_svg}} -->
            <span 
                v-for="(tag, index) in tags"
                :key="index"
                style="line-height: 0.70;"
            >
                <span class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-attribute" v-html="tag.value_to_display"></span>

                <!-- <span v-if="tag.type === `attribute`" class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-attribute" v-html="tag.value_to_display"></span>
                <span v-else-if="tag.type === `metric`" class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-metric" v-html="tag.value_to_display"></span>
                <span v-else class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-metric" v-html="tag.value_to_display"></span> -->

                <!-- <a href="#"
                    class="tags-input-remove"
                    @click.prevent="removeTag(index)"></a> -->
            </span>
            
            <input type="text"
                id="searchbar"
                ref="taginput"
                :placeholder="placeholder"
                v-model="input"
                v-show="!hideInputField"
                @keydown.enter.prevent="tagFromInput(false)"
                @keydown.8="removeLastTag"
                @keydown.down="nextSearchResult"
                @keydown.up="prevSearchResult"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @keyup.esc="clearSearchResults"
                @focus="onFocus"
                @click="onClick"
                @blur="onBlur"
                @value="tags"
                autocomplete="off">
            <!-- <div class="input-group-append"> -->
                <button
                class="btn voice-button"
                type="button"
                @click="voice_communication"
                v-if="is_dataset_selected && suggestions_search"
                style="background-color:inherit;padding-bottom:0;padding-top:0"
                title="Search Using Voice"
                >
                <i
                    class="fa fa-microphone"
                    id="microphone"
                ></i>
                </button>
            <!-- </div> -->
            <label style="margin:0">Suggestions &nbsp;</label>
            <label class="switch" style="margin-bottom:0">
                <!-- <input type="checkbox" v-model="nlp_search" id="nlp_search"> -->
                <input type="checkbox" v-model="suggestions_search" id="nlp_search">
                <span class="slider round" style="border-radius: 50px;"></span>
            </label>  
            <input type="hidden" v-if="elementId"
                :name="elementId"
                :id="elementId"
                v-model="hiddenInput">
        </div>

        <!-- Typeahead/Autocomplete -->
        <div v-show="searchResults.length">
            <p v-if="typeaheadStyle === 'badges'" :class="`typeahead-${typeaheadStyle}`">
                <span v-if="!typeaheadHideDiscard" class="tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default"
                    @click.prevent="clearSearchResults(true)"
                    v-html="discardSearchText"></span>

                <span v-for="(tag, index) in searchResults"
                    :key="index"
                    v-html="tag.value"
                    @mouseover="searchSelection = index"
                    @mousedown.prevent="tagFromSearchOnClick(tag)"
                    class="tags-input-badge"
                    v-bind:class="{
                        'tags-input-typeahead-item-default': index != searchSelection,
                        'tags-input-typeahead-item-highlighted-default': index == searchSelection
                    }"></span>
            </p>

            <ul v-else-if="typeaheadStyle === 'dropdown'" :class="`typeahead-${typeaheadStyle}`">
                <!-- <li v-if="!typeaheadHideDiscard" class="tags-input-typeahead-item-default typeahead-hide-btn"
                    @click.prevent="clearSearchResults(true)"
                    v-html="discardSearchText"></li> -->
                <div v-for="(tag, index) in searchResults"
                :key="index">
                    <li v-if="tag.type === `attribute`"
                v-html="attribute_svg + ` ` + tag.value + ` -  in ` + `<em>` + tag.column + `</em> ( ` + tag.dataset + ')'"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                 <li v-else-if="tag.type === `metric`"
                v-html="metrics_svg + ` ` + tag.value + ` -  in ` + `<em>` + tag.column + `</em> ( ` + tag.dataset + ')'"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                 <li v-else-if="tag.type === `value`"
                v-html="value_svg + ` ` + tag.value + ` -   in ` + `<em>` + tag.column + `</em> ( ` + tag.dataset + ')'"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                 <li v-else-if="tag.type === `keyword` && tag.keyword_type === `date`"
                v-html="keyword_svg + ` ` + tag.value+ ` -    in ` + `<em>` + tag.column + `</em> ( ` + tag.dataset + ')'"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                <li v-else-if="tag.type === `keyword`"
                v-html="keyword_svg + ` ` + tag.value"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                <li v-else-if="tag.type === `recent`"
                v-html="recent_svg + ` ` + tag.value"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                <li v-else
                v-html="metrics_svg + ` ` + tag.value + ` -  in ` + `<em>` + tag.column + `</em>`"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
                </div>
              <li v-if="!typeaheadHideDiscard" class="tags-input-typeahead-item-default typeahead-hide-btn"
                  style="cursor: not-allowed;"  @click.prevent="clearSearchResults(true)"
                    v-html="discardSearchText"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { voicerecorder, start_voice_communication, foreignxchange_custom, generate_time } from '@/portal/mixins';
export default {
    name: "VoerroTagsInput",
    props: {
        elementId: String,

        existingTags: {
            type: Array,
            default: () => {
                return [];
            }
        },

        value: {
            type: Array,
            default: () => {
                return [];
            }
        },

        typeahead: {
            type: Boolean,
            default: false
        },

        typeaheadStyle: {
            type: String,
            default: 'badges'
        },

        typeaheadActivationThreshold: {
            type: Number,
            default: 1
        },

        typeaheadMaxResults: {
            type: Number,
            default: 0
        },

        typeaheadAlwaysShow: {
            type: Boolean,
            default: false
        },

        typeaheadShowOnFocus: {
            type: Boolean,
            default: true
        },

        typeaheadHideDiscard: {
            type: Boolean,
            default: false
        },

        typeaheadUrl: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: ''
        },
        
        // discardSearchText: {
        //     type: String,
        //     default: this.metrics_svg + ` to navigate   ` + this.metrics_svg + ` to select ` + this.metrics_svg + `to dismiss`
        // },

        limit: {
            type: Number,
            default: 0
        },

        hideInputOnLimit: {
            type: Boolean,
            default: false
        },

        onlyExistingTags: {
            type: Boolean,
            default: false
        },

        deleteOnBackspace: {
            type: Boolean,
            default: true
        },

        allowDuplicates: {
            type: Boolean,
            default: true
        },
        
        validate: {
            type: Function,
            default: () => true
        },

        addTagsOnComma: {
            type: Boolean,
            default: false
        },

        addTagsOnSpace: {
            type: Boolean,
            default: false
        },

        addTagsOnBlur: {
            type: Boolean,
            default: false
        },

        wrapperClass: {
            type: String,
            default: 'tags-input-wrapper-default'
        },

        sortSearchResults: {
            type: Boolean,
            default: false
        },

        caseSensitiveTags: {
            type: Boolean,
            default: false
        },

        beforeAddingTag: {
            type: Function,
            default: () => true
        },

        beforeRemovingTag: {
            type: Function,
            default: () => true
        },
    },

    data() {
        return {
            badgeId: 0,
            tags: [],

            input: '',
            oldInput: '',
            hiddenInput: '',

            searchResults: [],
            searchSelection: 0,

            selectedTag: -1,

            isActive: false,
            attribute_svg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1240.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="632.3999999999999" y="652.8"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5736,12132C5550,11765 4933,10554 4365,9440C3797,8326 2908,6583 2390,5565C1871,4548 1121,3076 723,2296L0,877L0,779C0,695 2,681 18,676C27,673 253,622 520,561C787,501 1383,365 1845,260C2307,155 2753,53 2837,34C2936,12 3015,0 3062,0L3135,0L3664,1265L4193,2530L6135,2530L8077,2530L8615,1408C8911,790 9184,221 9221,143L9289,2L9327,10C9361,18 11508,485 12150,624L12395,677L12398,776L12401,876L12102,1460C11937,1782 11529,2580 11195,3235C10861,3890 10325,4938 10005,5565C9222,7097 7889,9707 7173,11110C6851,11740 6525,12378 6448,12528L6309,12800L6192,12800L6075,12799L5736,12132zM6530,6120C6746,5644 6925,5249 6927,5243C6931,5233 6767,5230 6126,5230C5683,5230 5320,5234 5320,5238C5320,5242 5343,5297 5371,5360C5399,5423 5572,5817 5757,6235C5941,6653 6097,7004 6102,7014C6112,7033 6113,7032 6125,7009C6132,6996 6314,6596 6530,6120z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
            value_svg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="652.8" y="652.8"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M1075,12793C941,12776 765,12720 651,12659C326,12484 110,12197 24,11825C6,11748 5,11658 5,9745C5,7832 6,7742 24,7665C82,7413 186,7223 360,7050C548,6863 763,6752 1028,6706C1110,6692 1329,6690 3055,6690C5169,6690 5065,6687 5255,6747C5694,6886 6016,7258 6094,7718C6108,7799 6110,8030 6110,9745C6110,11471 6108,11690 6094,11772C6048,12037 5937,12254 5750,12440C5582,12609 5412,12705 5160,12772L5075,12795L3090,12796C1998,12797 1092,12795 1075,12793z" id="svg_2" fill="#cccccc"></path><path d="M7735,12785C7342,12724 7003,12481 6829,12138C6758,11996 6721,11878 6700,11717C6694,11666 6690,10977 6690,9745C6690,8513 6694,7824 6700,7773C6771,7235 7147,6827 7680,6713C7761,6696 7868,6695 9745,6695C11622,6695 11729,6696 11810,6713C12060,6767 12272,6881 12444,7054C12629,7242 12744,7472 12785,7740C12807,7882 12807,11608 12785,11750C12756,11944 12700,12089 12593,12252C12438,12490 12187,12675 11919,12750C11736,12801 11797,12800 9735,12799C8246,12798 7797,12795 7735,12785z" id="svg_3" fill="#cccccc"></path><path d="M1070,6099C799,6064 548,5940 356,5746C171,5558 56,5328 15,5060C-7,4918 -7,1192 15,1050C44,856 100,711 207,548C397,257 694,69 1050,15C1192,-7 4918,-7 5060,15C5196,36 5290,64 5407,120C5758,287 5992,582 6086,980C6103,1050 6104,1173 6108,2990C6111,5002 6111,5027 6069,5190C5969,5584 5667,5911 5280,6043C5086,6109 5260,6104 3095,6106C2017,6107 1106,6104 1070,6099z" id="svg_4" fill="#cccccc"></path><path d="M7760,6099C7310,6041 6926,5735 6767,5308C6737,5230 6714,5129 6700,5027C6694,4976 6690,4287 6690,3055C6690,1823 6694,1134 6700,1083C6738,794 6855,553 7054,356C7242,171 7472,56 7740,15C7882,-7 11608,-7 11750,15C12106,69 12403,257 12593,548C12700,711 12756,856 12785,1050C12807,1192 12807,4918 12785,5060C12764,5196 12736,5290 12680,5407C12513,5758 12218,5992 11820,6086C11749,6103 11630,6104 9785,6106C8707,6107 7796,6104 7760,6099z" id="svg_5" fill="#cccccc"></path></g></g></svg>',
            metrics_svg:
                '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.4" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1280" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5186,12083C5183,12073 5108,11705 5020,11265C4649,9418 4540,8876 4540,8873C4540,8871 4027,8870 3400,8870L2260,8870L2260,8271C2260,7804 2263,7670 2273,7663C2279,7658 2331,7641 2387,7627L2489,7600L3384,7600C4094,7600 4280,7597 4280,7588C4279,7581 4168,7024 4031,6350L3784,5125L3114,5120L2445,5114L2376,5087C2339,5072 2299,5055 2289,5049C2271,5040 2270,5018 2270,4440L2270,3840L2895,3840C3388,3840 3520,3837 3520,3828C3520,3815 3372,3079 3061,1550C2963,1069 2886,672 2890,667C2893,663 3166,661 3496,662L4095,665L4152,805C4220,972 4205,912 4335,1555C4701,3354 4781,3750 4791,3793L4802,3840L5866,3840L6930,3840L6925,3818C6922,3805 6791,3162 6635,2387L6350,980L6350,820L6350,660L6955,660C7288,660 7560,662 7560,664C7560,668 7963,2628 8125,3415C8172,3640 8210,3828 8210,3832C8210,3836 8729,3840 9364,3840L10518,3840L10525,4423C10529,4743 10531,5014 10529,5025C10526,5040 10500,5054 10425,5082L10325,5119L9403,5120C8562,5120 8480,5121 8480,5136C8480,5151 8975,7545 8986,7583C8991,7599 9031,7600 9648,7600L10305,7600L10413,7629C10473,7645 10523,7660 10526,7662C10528,7665 10533,7937 10537,8268L10543,8870L9897,8870C9541,8870 9250,8872 9250,8875C9250,8878 9358,9411 9491,10058C9623,10705 9771,11430 9819,11668L9908,12100L9294,12100L8681,12100L8666,12073C8658,12057 8631,11993 8606,11930C8555,11804 8578,11911 8174,9925C8078,9452 7991,9023 7980,8973C7969,8922 7960,8878 7960,8875C7960,8872 7479,8870 6890,8870C6298,8870 5820,8874 5820,8879C5820,8887 6263,11085 6365,11583C6407,11784 6410,11813 6410,11950L6410,12100L5801,12100C5229,12100 5191,12099 5186,12083zM7700,7595C7700,7592 7585,7036 7445,6359C7305,5683 7190,5127 7190,5125C7190,5122 6711,5120 6125,5120C5539,5120 5060,5123 5060,5126C5060,5129 5173,5685 5310,6362C5448,7038 5560,7594 5560,7596C5560,7598 6042,7600 6630,7600C7219,7600 7700,7598 7700,7595z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
            keyword_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.4" viewBox="0 0 1163.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1163" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5295,12794C3131,12724 1438,12393 600,11874C301,11690 103,11463 45,11239C26,11169 6,10966 7,10855C7,10732 25,10706 325,10396C469,10247 1528,9153 2679,7965L4770,5805L4770,3085C4770,1263 4774,344 4780,301C4806,147 4912,37 5065,9C5097,3 5387,1 5801,2L6485,5L6552,38C6632,77 6690,139 6722,219L6745,275L6750,3026L6755,5776L8251,7301C11694,10811 11549,10661 11577,10717C11591,10746 11609,10770 11616,10770C11628,10770 11630,10820 11630,11060L11630,11350L11598,11350C11568,11350 11562,11355 11532,11414C11429,11613 11177,11822 10831,11995C9985,12418 8597,12684 6735,12780C6540,12791 5494,12800 5295,12794z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
            discardSearchText: '',
            arrows_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1211.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1211" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M3954,12723C3937,12720 3930,12707 3921,12657C3749,11773 3319,10825 2599,9750C1999,8853 1308,8024 423,7143L0,6721L0,6640L0,6558L32,6565C50,6569 128,6587 205,6605C547,6688 814,6731 1162,6761C1367,6779 2587,6756 2583,6735C2582,6729 2577,6675 2571,6615C2565,6554 2556,6465 2550,6415C2544,6366 2535,6282 2530,6230C2525,6178 2516,6095 2510,6045C2504,5996 2495,5912 2490,5860C2485,5808 2476,5725 2470,5675C2464,5626 2455,5542 2450,5490C2445,5438 2436,5355 2430,5305C2424,5256 2415,5172 2410,5120C2405,5068 2396,4985 2390,4935C2384,4886 2375,4802 2370,4750C2365,4698 2356,4615 2350,4565C2344,4516 2335,4432 2330,4380C2325,4328 2316,4245 2310,4195C2304,4146 2295,4062 2290,4010C2285,3958 2276,3875 2270,3825C2264,3776 2255,3692 2250,3640C2245,3588 2236,3505 2230,3455C2224,3406 2215,3322 2210,3270C2205,3218 2196,3135 2190,3085C2180,2998 2167,2870 2154,2743L2147,2680L4007,2680L5867,2680L5859,2728C5855,2754 5849,2800 5845,2830C5841,2860 5832,2935 5824,2995C5816,3056 5805,3139 5800,3180C5794,3221 5788,3271 5785,3290C5783,3309 5773,3381 5765,3450C5756,3519 5747,3586 5745,3600C5743,3614 5739,3648 5735,3675C5732,3703 5727,3739 5725,3755C5719,3798 5690,4028 5684,4075C5681,4097 5677,4126 5674,4140C5667,4173 5669,4171 5787,4010C6691,2783 7643,1095 7944,182L7982,70L8050,70C8171,70 8176,73 8190,144C8360,1027 8792,1975 9511,3050C10111,3947 10802,4776 11687,5657L12110,6079L12110,6160L12110,6242L12078,6235C12060,6231 11982,6213 11905,6195C11563,6112 11296,6069 10948,6039C10743,6021 9523,6044 9527,6065C9528,6071 9533,6125 9539,6185C9545,6246 9554,6336 9560,6385C9566,6435 9575,6518 9580,6570C9585,6622 9594,6706 9600,6755C9606,6805 9615,6888 9620,6940C9625,6992 9634,7076 9640,7125C9646,7175 9655,7258 9660,7310C9665,7362 9674,7446 9680,7495C9686,7545 9695,7628 9700,7680C9705,7732 9714,7816 9720,7865C9726,7915 9735,7998 9740,8050C9745,8102 9754,8186 9760,8235C9766,8285 9775,8368 9780,8420C9785,8472 9794,8556 9800,8605C9806,8655 9815,8738 9820,8790C9825,8842 9834,8926 9840,8975C9846,9025 9855,9108 9860,9160C9865,9212 9874,9296 9880,9345C9886,9395 9895,9478 9900,9530C9905,9582 9914,9666 9920,9715C9930,9802 9943,9930 9956,10058L9963,10120L8103,10120L6243,10120L6251,10072C6255,10046 6261,10000 6265,9970C6269,9940 6278,9866 6286,9805C6294,9745 6305,9661 6310,9620C6316,9579 6322,9529 6325,9510C6327,9491 6337,9419 6345,9350C6360,9232 6364,9203 6375,9120C6378,9101 6382,9069 6385,9050C6391,9002 6420,8774 6426,8725C6429,8703 6433,8674 6436,8660C6443,8627 6441,8629 6323,8790C5419,10017 4467,11705 4166,12618L4128,12730L4052,12729C4010,12728 3965,12725 3954,12723zM6436,6813L6676,6807L6724,6436C6750,6232 6774,6053 6777,6039L6782,6014L6563,6002C6166,5980 6040,5978 5736,5985L5434,5993L5386,6364C5360,6568 5336,6747 5333,6761L5328,6786L5552,6799C5931,6820 6106,6822 6436,6813z" id="svg_2" fill="#e5e5e5"></path><path d="M6230,10334C6230,10323 6233,10298 6236,10278C6242,10242 6244,10240 6282,10240L6321,10240L6289,10285C6246,10345 6230,10358 6230,10334z" id="svg_3" fill="#e5e5e5"></path></g></g></svg>',
            enter_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1280.000000 1124.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1280" y="1124"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1124) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M9470,11229C9456,11223 9434,11209 9422,11197C9366,11145 9370,11371 9370,8060L9370,5000L6400,5000L3430,5000L3430,5724L3430,6447L3407,6480C3362,6547 3272,6572 3204,6537C3188,6528 2465,5811 1598,4943C-112,3231 -13,3337 4,3243C11,3209 164,3053 1598,1617C2471,744 3199,23 3216,15C3261,-6 3300,-4 3350,23C3435,68 3430,19 3430,837L3430,1560L8048,1560L12666,1560L12710,1583C12734,1595 12763,1618 12774,1633L12795,1661L12795,6400L12795,11139L12774,11166C12763,11181 12741,11203 12726,11214C12699,11235 12697,11235 11097,11237C10046,11238 9486,11235 9470,11229z" id="svg_2" fill="#e5e5e5"></path></g></g></svg>',
            enter_svg_alt: '<svg xmlns="http://www.w3.org/2000/svg" height="10.4" viewBox="0 0 24 24" width="10.4"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"/></svg>',
            // escape_svg:'<svg style="vector-effect: non-scaling-stroke;" xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 1280.000000 1131.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="640" y="565.5"><metadata style="vector-effect: non-scaling-stroke;">Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events: all; vector-effect: non-scaling-stroke;"><title style="pointer-events: inherit; vector-effect: non-scaling-stroke;">Layer 1</title><text fill="#cccccc" stroke-width="0" x="274.5155974472881" y="426.51558975828925" id="svg_14" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" fill-opacity="1" stroke-opacity="1" transform="matrix(25.5159 0 0 35.3931 -6363.26 -14242.2)" stroke="#e5e5e5" font-weight="bold" font-style="normal">ESC</text></g></svg>',
            // escape_svg:'<svg style="vector-effect: non-scaling-stroke !important;" xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 1280.000000 1131.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="640" y="565.5"><g class="layer" style="pointer-events: all; vector-effect: non-scaling-stroke;"><title style="pointer-events: inherit; vector-effect: non-scaling-stroke;">Layer 1</title><text fill="#cccccc" stroke-width="0" x="274.5155974472881" y="426.51558975828925" id="svg_14" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" fill-opacity="1" stroke-opacity="1" transform="matrix(25.5159 0 0 35.3931 -6363.26 -14242.2)" stroke="#e5e5e5" font-weight="bold" font-style="normal">ESC</text></g></svg>',
            escape_svg: '<svg style="vector-effect: non-scaling-stroke !important;" xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 1280.000000 1131.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="640" y="565.5"><g class="layer_escape" style="pointer-events: all; vector-effect: non-scaling-stroke !important;"><text fill="#cccccc" stroke-width="0" x="274.5155974472881" y="426.51558975828925" id="svg_escape" font-size="24" font-family="Sans-serif" text-anchor="middle" xml:space="preserve" fill-opacity="1" stroke-opacity="1" transform="matrix(25.5159 0 0 35.3931 -6363.26 -14242.2)" stroke="#e5e5e5" font-weight="bold" font-style="normal">ESC</text></g></svg>',
            arrows_svg_alt: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15" viewBox="0 0 820.000000 1060.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,1060.000000) scale(0.100000,-0.100000)" fill="#cccccc" stroke="none"><path d="M1488 8357 c-757 -1007 -1374 -1834 -1371 -1837 2 -3 419 -7 926 -10 l922 -5 3 -919 2 -919 907 6 c498 4 909 9 912 13 3 3 8 414 11 912 l5 907 907 5 c498 3 909 8 913 12 7 7 -2734 3659 -2750 3665 -6 1 -629 -822 -1387 -1830z"/><path d="M4418 5023 l-3 -928 -923 -3 c-567 -1 -922 -6 -920 -11 2 -6 623 -836 1382 -1846 l1378 -1835 1373 1832 c755 1008 1373 1838 1374 1843 1 7 -312 12 -911 15 l-913 5 -3 928 -2 927 -915 0 -915 0 -2 -927z"/></g></svg>',
            search_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1235.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1235" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M4165,12794C3568,12750 3097,12627 2605,12385C2309,12239 2037,12063 1800,11861C1663,11745 1236,11344 1113,11216C578,10659 214,9946 71,9175C-6,8758 -17,8296 40,7870C205,6632 909,5522 1970,4827C2184,4687 2471,4537 2705,4442C3606,4077 4624,4037 5530,4331C5865,4440 6189,4595 6481,4785L6577,4848L7376,4036C11014,342 11250,104 11301,73C11392,19 11435,7 11545,7C11639,6 11650,9 11720,42C11798,78 11807,85 12071,331C12247,494 12268,517 12299,578C12373,723 12362,902 12272,1038C12256,1061 11310,2028 10169,3187C9028,4345 7988,5403 7857,5536L7618,5779L7687,5857C8070,6293 8368,6854 8526,7433C8733,8197 8712,9031 8468,9790C8108,10910 7307,11841 6255,12360C5798,12585 5352,12716 4830,12776C4710,12790 4269,12802 4165,12794zM4287,11560C4942,11506 5529,11285 6044,10899C6862,10284 7359,9362 7408,8370C7446,7600 7230,6883 6780,6282C6642,6097 6552,6011 6377,5895C5951,5614 5473,5441 4966,5385C4707,5356 4323,5369 4055,5415C2724,5645 1632,6692 1335,8024C1276,8292 1266,8388 1266,8735C1266,9017 1269,9072 1288,9197C1378,9770 1586,10264 1918,10688C2045,10851 2091,10898 2205,10979C2806,11409 3559,11619 4287,11560z" id="svg_2" fill="#999999"></path></g></g></svg>',
            nlp_search: true,
            suggestions_search: false,
            is_dataset_selected: false,
            recent_svg: '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="15px" width="15px"	 viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve"><style> .recent { fill: #E5E5E5 } </style><g>	<g>		<path class="recent" d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933			C477.726,107.033,370.834,0.141,238.933,0z M238.933,443.733c-113.108,0-204.8-91.692-204.8-204.8s91.692-204.8,204.8-204.8			s204.8,91.692,204.8,204.8C443.611,351.991,351.991,443.611,238.933,443.733z"/>	</g></g><g>	<g>		<path class="recent" d="M238.933,85.333c-9.426,0-17.067,7.641-17.067,17.067v119.467H102.4c-9.426,0-17.067,7.641-17.067,17.067			S92.974,256,102.4,256h136.533c9.426,0,17.067-7.641,17.067-17.067V102.4C256,92.974,248.359,85.333,238.933,85.333z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
        };
    },

    created () {
        this.tagsFromValue();

        if (this.typeaheadAlwaysShow) {
            this.searchTag(false);
        }
    },

    mounted () {
        // Emit an event
        this.discardSearchText = this.arrows_svg_alt + '&nbsp; to navigate     ' + this.enter_svg + '&nbsp; to select ' + this.escape_svg + '&nbsp; to dismiss';
        this.$emit('initialized');
        
        document.addEventListener('click', (e) => {
            if (e.target !== this.$refs['taginput']) {
                this.clearSearchResults();
            }
        });

        this.$on('analytics_search_bar_voice_result',(data) => {
            this.input = data;
        });

        this.$root.$on('dataset_selected',(data) => {
            this.is_dataset_selected = true;
        })
        this.$root.$on('clear_analytics_search_bar', (data) => {
          this.input = "";
        });
        this.$root.$on('add_text_to_search_bar', (data) => {
          this.input = data;
        });
    },

    computed: {
        hideInputField() {
            return (this.hideInputOnLimit && this.limit > 0 && this.tags.length >= this.limit);
        }
    },

    watch: {
        input(newVal, oldVal) {
            this.searchTag(false);

            if (newVal.length && newVal != oldVal) {
                const diff = newVal.substring(oldVal.length, newVal.length);

                if (this.addTagsOnSpace) {
                    if (newVal.endsWith(' ')) {
                        // The space shouldn't actually be inserted
                        this.input = newVal.trim();

                        // Add the inputed tag
                        this.tagFromInput(true);
                    }
                }

                if (this.addTagsOnComma) {
                    newVal = newVal.trim();

                    if (newVal.endsWith(',')) {
                        // The comma shouldn't actually be inserted
                        this.input = newVal.substring(0, newVal.length - 1);

                        // Add the inputed tag
                        this.tagFromInput(true);
                    }
                }

                this.$emit('change', newVal);
            }
        },

        tags() {
            // Updating the hidden input
            this.hiddenInput = JSON.stringify(this.tags);

            // Update the bound v-model value
            this.$emit('input', this.tags);
        },

        value() {
            this.tagsFromValue();
        },

        typeaheadAlwaysShow(newValue) {
            if (newValue) {
                this.searchTag(false);
            } else {
                this.clearSearchResults();
            }
        },
        nlp_search(newVal,oldVal){
            if(newVal === true){
                this.$root.$emit('nlp_search', true);
            }
            if(newVal === false){
                this.$root.$emit('nlp_search', false);
            }
            // console.log(newVal,oldVal);

            // this.search_data = [];
            // if(newVal === false){
            //     this.dataset_icon_to_be_showed = this.dataset_icon_svg;
            //     this.dataset_name = null;
            // }
        },
        suggestions_search(newVal, oldVal){
            if(newVal === true){
                this.$root.$emit('nlp_search', false);
            }
            if(newVal === false){
                this.$root.$emit('nlp_search', true);
            }
        }

    },

    methods: {
        /**
         * Remove reserved regex characters from a string so that they don't
         * affect search results
         * 
         * @param string
         * @returns String
         */
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        /**
         * Add a tag whether from user input or from search results (typeahead)
         * 
         * @param ignoreSearchResults
         * @returns void
         */
        tagFromInput(ignoreSearchResults = false) {
            // If we're choosing a tag from the search results
            if (this.searchResults.length && this.searchSelection >= 0 && !ignoreSearchResults) {
                this.tagFromSearch(this.searchResults[this.searchSelection]);

                this.input = '';
            } else {
                // If we're adding an unexisting tag
                let text = this.input.trim();

                // If the new tag is not an empty string and passes validation
                if (!this.onlyExistingTags && text.length && this.validate(text)) {
                    this.input = '';

                    // Determine if the inputted tag exists in the existingTags
                    // array
                    let newTag = {
                        key: null,
                        value: text,
                        value_to_display: text
                    };
                    // console.log(newTag.value, typeof(newTag.value));
                    // const searchQuery = this.escapeRegExp(
                    //     this.caseSensitiveTags
                    //         ? newTag.value
                    //         : newTag.value.toLowerCase()
                    // );
                    

                    // for (let tag of this.existingTags) {
                    //     const compareable = this.caseSensitiveTags
                    //         ? tag.value
                    //         : tag.value.toLowerCase();

                    //     if (searchQuery === compareable) {
                    //         newTag = Object.assign({}, tag);

                    //         break;
                    //     }
                    // }

                    this.addTag(newTag);
                }
            }
        },

        /**
         * Add a tag from search results when a user clicks on it
         * 
         * @param tag
         * @returns void
         */
        tagFromSearchOnClick(tag) {
            this.tagFromSearch(tag);

            this.$refs['taginput'].blur();
        },

        /**
         * Add the selected tag from the search results.
         * Clear search results.
         * Clear user input.
         * 
         * @param tag
         * @return void
         */
        tagFromSearch(tag) {
            this.clearSearchResults();
            this.addTag(tag);

            this.$nextTick(() => {
                this.input = '';
                this.oldInput = '';
            });
        },

        /**
         * Add/Select a tag
         * 
         * @param tag
         * @returns void | Boolean
         */
        addTag(tag) {
            if (!this.beforeAddingTag(tag)) {
                return false;
            }

            // Check if the limit has been reached
            if (this.limit > 0 && this.tags.length >= this.limit) {
                this.$emit('limit-reached');

                return false;
            }

            // Attach the tag if it hasn't been attached yet
            if (!this.tagSelected(tag)) {
                this.tags.push(tag);

                // Emit events
                this.$nextTick(() => {
                    this.$emit('tag-added', tag);
                    this.$emit('tags-updated');
                });
            }
        },

        /**
         * Remove the last tag in the tags array.
         * 
         * @returns void
         */
        removeLastTag() {
            if (!this.input.length && this.deleteOnBackspace && this.tags.length) {
                this.removeTag(this.tags.length - 1);
            }
        },

        /**
         * Remove the selected tag at the specified index.
         * 
         * @param index
         * @returns void
         */
        removeTag(index) {
            let tag = this.tags[index];

            if (!this.beforeRemovingTag(tag)) {
                return false;
            }

            this.tags.splice(index, 1);

            // Emit events
            this.$nextTick(() => {
                this.$emit('tag-removed', tag);
                this.$emit('tags-updated');

                if (this.typeaheadAlwaysShow) {
                    this.searchTag();
                }
            });
        },

        /**
         * Search the currently entered text in the list of existing tags
         * 
         * @returns void | Boolean
         */
        searchTag() {
            if (this.typeahead !== true) {
                return false;
            }

            if (this.oldInput != this.input || (!this.searchResults.length && this.typeaheadActivationThreshold == 0) || this.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
                this.searchResults = [];
                this.searchSelection = 0;
                let input = this.input.trim();

                if ((input.length && input.length >= this.typeaheadActivationThreshold) || this.typeaheadActivationThreshold == 0 || this.typeaheadAlwaysShow) {
                    // Find all the existing tags which include the search text
                    const searchQuery = this.escapeRegExp(
                        this.caseSensitiveTags ? input : input.toLowerCase()
                    );

                    // AJAX search
                    if (this.typeaheadUrl.length > 0) {
                        this.existingTags.splice();
                        const xhttp = new XMLHttpRequest();
                        const that = this;

                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                that.existingTags = JSON.parse(xhttp.responseText);

                                that.doSearch(searchQuery);
                            }
                        }

                        const endpoint = this.typeaheadUrl.replace(':search', searchQuery);
                        xhttp.open('GET', endpoint, true);
                        xhttp.send();
                    } else {
                        // Search the existing collection
                        this.doSearch(searchQuery);
                    }
                }

                this.oldInput = this.input;
            }
        },

        /**
         * Perform the actual search
         * 
         * @param string searchQuery
         * @return void
         */
        doSearch(searchQuery) {
            // console.log(searchQuery,typeof(searchQuery));
            // debugger;
            for (let tag of this.existingTags) {
                const compareable = this.caseSensitiveTags
                    ? tag.value
                    : tag.value.toString().toLowerCase();
                // const compareable = tag.value;

                if (compareable.search(searchQuery) > -1 && ! this.tagSelected(tag)) {
                    this.searchResults.push(tag);
                }
            }

            // Sort the search results alphabetically
            if (this.sortSearchResults) {
                this.searchResults.sort((a, b) => {
                    if (a.value < b.value) return -1;
                    if (a.value > b.value) return 1;

                    return 0;
                });
            }

            // Shorten Search results to desired length
            if (this.typeaheadMaxResults > 0) {
                this.searchResults = this.searchResults.slice(
                    0,
                    this.typeaheadMaxResults
                );
            }
        },

        /**
         * Hide the typeahead if there's nothing intered into the input field.
         * 
         * @returns void
         */
        hideTypeahead() {
            if (! this.input.length) {
                this.$nextTick(() => {
                    this.clearSearchResults();
                });
            }
        },

        /**
         * Select the next search result in typeahead.
         * 
         * @returns void
         */
        nextSearchResult() {
            if (this.searchSelection + 1 <= this.searchResults.length - 1) {
                this.searchSelection++;
            }
        },

        /**
         * Select the previous search result in typeahead.
         * 
         * @returns void
         */
        prevSearchResult() {
            if (this.searchSelection > 0) {
                this.searchSelection--;
            }
        },

        /**
         * Clear/Empty the search results.
         * 
         * @reutrns void
         */
        clearSearchResults(returnFocus = false) {
            this.searchResults = [];
            this.searchSelection = 0;

            if (this.typeaheadAlwaysShow) {
                this.$nextTick(() => {
                    this.searchTag();
                });
            }

            if (returnFocus) {
                this.$refs['taginput'].focus();
            }
        },

        /**
         * Clear the list of selected tags.
         * 
         * @returns void
         */
        clearTags() {
            this.tags.splice(0, this.tags.length);
        },

        /**
         * Replace the currently selected tags with the tags from the value.
         * 
         * @returns void
         */
        tagsFromValue() {
            if (this.value && this.value.length) {
                if (!Array.isArray(this.value)) {
                    console.error('Voerro Tags Input: the v-model value must be an array!');

                    return;
                }
                
                let tags = this.value;

                // Don't update if nothing has changed
                if (this.tags == tags) {
                    return;
                }

                this.clearTags();

                for (let tag of tags) {
                    this.addTag(tag);
                }
            } else {
                if (this.tags.length == 0) {
                    return;
                }

                this.clearTags();
            }
        },

        /**
         * Check if a tag is already selected.
         * 
         * @param tag
         * @returns Boolean
         */
        tagSelected(tag) {
            if (this.allowDuplicates) {
                return false;
            }

            if (! tag) {
                return false;
            }

            const searchQuery = this.escapeRegExp(
                this.caseSensitiveTags ? tag.value : tag.value.toString().toLowerCase()
            );

            for (let selectedTag of this.tags) {
                const compareable = this.caseSensitiveTags
                    ? selectedTag.value
                    : selectedTag.value.toString().toLowerCase();

                if (selectedTag.key === tag.key && this.escapeRegExp(compareable).length == searchQuery.length && compareable.search(searchQuery) > -1) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Clear the input.
         * 
         * @returns void
         */
        clearInput() {
            this.input = '';
        },

        /**
         * Process all the keyup events.
         * 
         * @param e
         * @returns void
         */
        onKeyUp(e) {
            this.$emit('keyup', e);
        },

        /**
         * Process all the keydown events.
         * 
         * @param e
         * @returns void
         */
        onKeyDown(e) {
            this.$emit('keydown', e);
        },

        /**
         * Process the onfocus event.
         * 
         * @param e
         * @returns void
         */
        onFocus(e) {
            this.$emit('focus', e);

            this.isActive = true;
        },

        /**
         * Process the onClick event.
         * 
         * @param e
         * @returns void
         */
        onClick(e) {
            this.$emit('click', e);

            this.isActive = true;

            this.searchTag();
        },

        /**
         * Process the onblur event.
         * 
         * @param e
         * @returns void
         */
        onBlur(e) {
            this.$emit('blur', e)

            if (this.addTagsOnBlur) {
                // Add the inputed tag
                this.tagFromInput(true);
            }

            if (!this.typeaheadAlwaysShow) {
                this.hideTypeahead();
            } else {
                this.searchTag();
            }

            this.isActive = false;
        },
    },
    mixins: [voicerecorder, start_voice_communication, foreignxchange_custom, generate_time],
}
</script>

<template>
	<div>
		<setting-color></setting-color>
		<div class="pd-10 theme-cl">
		    <div>
		        <span class="v-top" style="line-height: 42px">Change theme color to: </span>
		        <el-button @click="reset" size="small" >Reset</el-button>
		    </div>
		    <hr/>
		    <h2>
		        <i class="my-icon-bookmark"></i>
		        element-ui css:
		    </h2>
		    <el-button icon="my-icon-calendar"> default</el-button>
		    <el-button type="primary" icon="my-icon-warning"> primary</el-button>
		    <!--<el-button type="success">success</el-button>-->
		    <!--<el-button type="info">info</el-button>-->
		    <!--<el-button type="warning">warning</el-button>-->
		    <!--<el-button type="danger">danger</el-button>-->
		    <el-button type="text" icon="el-icon-s-tools">text</el-button>
			<p/>
		    <el-button plain icon="el-icon-upload">default</el-button>
		    <el-button plain type="primary" icon="el-icon-picture">primary</el-button>
		    <!--<el-button plain type="success">success</el-button>-->
		    <!--<el-button plain type="info">info</el-button>-->
		    <!--<el-button plain type="warning">warning</el-button>-->
		    <!--<el-button plain type="danger">danger</el-button>-->
		    <p/>
		    <el-button :loading="true">default</el-button>
		    <el-button type="primary" :loading="true">primary</el-button>
		    <!--<el-button type="success" :loading="true">success</el-button>-->
		    <!--<el-button type="info" :loading="true">info</el-button>-->
		    <!--<el-button type="warning" :loading="true">warning</el-button>-->
		    <!--<el-button type="danger" :loading="true">danger</el-button>-->
		    <el-button type="text" :loading="true">text</el-button>
			<p/>
		    <el-button plain :loading="true">default</el-button>
		    <el-button plain type="primary" :loading="true">primary</el-button>
		    <!--<el-button plain type="success" :loading="true">success</el-button>-->
		    <!--<el-button plain type="info" :loading="true">info</el-button>-->
		    <!--<el-button plain type="warning" :loading="true">warning</el-button>-->
		    <!--<el-button plain type="danger" :loading="true">danger</el-button>-->
		
		    <p/>
		    <el-tag closable>Color of element-ui css</el-tag>
			<p/>
		    <el-input style="width: 200px" suffix-icon="el-icon-search" placeholder="Input ..." v-model="tx"></el-input>
			<p/>
		    <el-switch v-model="checked" active-text="switch">
		    </el-switch>
			<p/>
		    <el-date-picker v-model="date"></el-date-picker>
		
		    <p/>
		    <el-table :data="tableData" tooltip-effect="light" stripe>
		        <el-table-column type="selection" min-width="55" :width="55">
		        </el-table-column>
		        <el-table-column label="Name" prop="name" :fixed="true"
		                         :min-width="120" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column label="Score" prop="score" :fixed="true"
		                         :min-width="120" :show-overflow-tooltip="true">
		        </el-table-column>
		    </el-table>
			<p/>
			<div >
				<el-pagination
						:current-page="1"
						:page-sizes="[10,20]"
						:page-size="12"
						:total="36">
				</el-pagination>
			</div>
		
		    <p/>
		    <hr/>
		    <h2>self css:</h2>
		    <div>
		        <nav class="series-primary">primary color in self css</nav>
				<p></p>
		        <nav class="series-3">primary color series in self css</nav>
				<p></p>
		        <nav class="series-5">primary color series in self css</nav>
		    </div>
		
		    <h2>other custom colors:</h2>
		    <div class="custom-color">
		        my custom color
		    </div>
		    <div class="custom-color2">
		        my custom color 2
		    </div>
		
		    <br/>
		    <a href="./" class="primay-color">&lt;&lt; Back</a>
		
		</div>
	</div>
   
</template>

<script>
    import { Button, Tag, Input, Switch, Table, TableColumn, Pagination, DatePicker } from 'element-ui';
    import Vue from 'vue'
	import settingColor from './setting.vue'
    Vue.use(Button).use(Tag).use(Input).use(Switch).use(Table).use(TableColumn).use(Pagination).use(DatePicker)

    export default {
        props: {},
		computed: {},
		components:{
			settingColor,
			// [Button.name]:Button,
			// [Tag.name]:Tag,
			// [Input.name]:Input,
			// [Switch.name]:Switch,
			// [Table.name]:Table,
			// [TableColumn.name]:TableColumn,
			// [Pagination.name]:Pagination,
			// [DatePicker.name]:DatePicker,
		},
        data() {
            return {
                tx: '',
                checked: true,
                date: new Date(),
                tableData: [
                    { name: 'James', score: 99 },
                    { name: 'Lily', score: 79 },
                    { name: 'Linda', score: 86 },
                ]
            };
        },
        methods: {
            reset() {
                localStorage.removeItem('theme_color')
                location.reload()
            }
        }
        
    }
</script>

<style scoped lang="scss">
    @import "../../css/defines.scss";

    .series-primary {
        background: $--color-primary;
    }

    .series-3 {
        background: $--color-primary-light-3;
    }

    .series-5 {
        background: $--color-primary-light-5;
    }

    .custom-color {
        background: $my-custom-color;
    }

    .custom-color2 {
        background: $my-custom-color2;
    }

    nav {
        padding: 10px;
        width: 260px;
        display: inline-block;
    }

    h2 {
        margin-top: 30px;
    }
	.theme-cl{
		text-align: center;
	}
    .theme-cl ::v-deep {
        .el-button {
            width: 200px;
			margin: 10px;
        }

        .el-table .el-table__row--striped td {
            background: $--color-primary-light-95;
        }
    }

    .my-icon-bookmark {
        color: $--color-primary-light-5;
    }
</style>

<template>
	<div>
		<header-view :title="title" :color="color"></header-view>
		<!-- <el-card class="el-card" style="background-color: #ffffff"> -->
		<div style="background-color: #fff;">
			<div id="waveform" ref="waveform"></div>
			<div id="wave-timeline" ref="wave-timeline"></div>
			<p id="subtitle" style="text-align: center;font-size:22px;color: #666699" />
			<!-- <button type="primary" @click="plays"> 播放/暂停</button> -->
			<div v-show="ppt" id="wave-spectrogram" class="mt-20" />
		</div>
		<!-- </el-card> -->
		<el-row type="flex" class="mt-20" justify="center">
			<el-col :span="24">
				<el-card class="box-card">
					<el-tooltip class="item" effect="dark" content="后退" placement="bottom">
						<el-button circle @click="rew">
							<img src="../../assets/img/shang.png" class="my-btn2" alt="" />
						</el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="播放" placement="bottom">
						<el-button circle @click="plays">
						<!-- <el-button circle @click="playMusic"> -->
							<van-icon name="play" v-if="!isPlay" class="my-btn" />
							<van-icon name="stop" v-if="isPlay" class="my-btn" />
						</el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="前进" placement="bottom">
						<el-button circle @click="speek"><img src="../../assets/img/xia.png" class="my-btn2" alt="" /></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="重放" placement="bottom">
						<el-button circle @click="replay"><van-icon name="replay" class="my-btn" /></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="指定播放" placement="bottom">
						<el-popover placement="top" width="200" trigger="click">
							<el-input v-model="appointTime" placeholder="请输入内容" class="input-with-select">
								<el-button slot="append" @click="appointPlay">播放</el-button>
							</el-input>
							<el-button slot="reference" circle style="margin-left: 6px;"><van-icon name="aim" class="my-btn" /></el-button>
						</el-popover>
					</el-tooltip>
					<span class="span" />
					<el-tooltip class="item" effect="dark" content="音量" placement="bottom">
						<el-popover placement="top-start" trigger="click" style="min-width: 38px;">
							<div class="block" style="width: 42px"><el-slider v-model="value" vertical height="100px" @change="setVolume" /></div>
							<el-button slot="reference" circle><van-icon name="volume" class="my-btn" /></el-button>
						</el-popover>
					</el-tooltip>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<el-card>
					<el-select v-model="ChannelValue" class="my-select" placeholder="请选择" @change="channelsChange">
						<el-option v-for="item in ChannelsSelect" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
					<el-switch v-model="ypt" active-text="频谱图" active-color="#13ce66" inactive-color="#ff4949" style="margin-left: 10px" />
					<el-switch v-model="ppt" active-text="时频图" active-color="#13ce66" inactive-color="#ff4949" />
					<el-tooltip class="item" effect="dark" content="缩放" placement="bottom">
						<el-popover placement="top-start" style="min-width: 38px" trigger="hover">
							<div class="block" style="width: 42px">
								<el-slider v-model="zoomValue" vertical height="150px" :step="10" :min="zoomMin" :format-tooltip="formatZoom" @change="zoomChange" />
							</div>
							<el-button slot="reference" circle style="margin-left: 10px"><i class="el-icon-rank my-btn"></i></el-button>
						</el-popover>
					</el-tooltip>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-card>
					<el-tooltip class="item" effect="dark" content="播放倍速" placement="bottom">
						<el-popover placement="top" width="220" trigger="click" style="margin-left: 10px">
							<el-input-number v-model="ds" width="180" :precision="2" :step="0.1" :min="0.5" :max="2" @change="DoubleSpeed" />
							<el-button slot="reference" round>{{ ds + ' X' }}</el-button>
						</el-popover>
					</el-tooltip>
					<span class="span" />
					<el-button circle @click="modeSwitch">
						<van-icon v-if="!modeValue" name="expand" class="my-btn" />
						<!-- <svg-icon v-if="!modeValue" icon-class="pingpu" /> -->
						<!-- <svg-icon v-if="modeValue" icon-class="list" /> -->
						<van-icon v-if="modeValue" name="bars" class="my-btn" />
					</el-button>
					<el-button circle><van-icon name="video" class="my-btn" /></el-button>
				</el-card>
			</el-col>
		</el-row>
		<!-- main主体 -->
		
		<el-row>
			<el-col :span="24">
				<div v-if="modeValue" class="mt-20">
					<el-table :data="noteData" style="width: 100%;" height="250">
						<el-table-column label="起始">
							<template slot-scope="{ row }">
								<span>{{ formatS(row.start) }}</span>
							</template>
						</el-table-column>
						<el-table-column label="截止">
							<template slot-scope="{ row }">
								<span>{{ formatS(row.end) }}</span>
							</template>
						</el-table-column>
						<el-table-column label="内容">
							<template slot-scope="{ row }">
								<template v-if="!row.edit">
									<el-input v-model="row.data.note" class="edit-input" size="small" />
								</template>
								<span v-else>{{ row.data.note }}</span>
							</template>
						</el-table-column>
						<el-table-column width="100px" label="操作">
							<template slot-scope="{ row }">
								<el-button v-if="row.edit" size="mini" @click="row.edit = !row.edit">编辑</el-button>
								<el-button v-else size="mini" type="success" @click="onSaveNote(row)">确定</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-row v-if="modeValue" class="clearfloat mt-20 mb-20" style="text-align: center;">
					<el-col>
						<el-button type="success" @click="parsingPanel = !parsingPanel">查看解析</el-button>
						<el-button type="primary" @click="answerPanel = !answerPanel">查看答案</el-button>
						<el-button type="danger" @click="submitAnswer()">提交</el-button>
					</el-col>
				</el-row>
				<div v-else class="mt-20">
					<el-input v-model="textarea" type="textarea" :rows="10" placeholder="请输入内容" />
					<el-row style="margin-top: 20px;width: 100%;margin-bottom: 20px;">
						<el-col>
							<el-button type="success" @click="parsingPanel = !parsingPanel">查看解析</el-button>
							<el-button type="primary" @click="answerPanel = !answerPanel">查看答案</el-button>
							<el-button type="danger" @click="submitAnswer()">提交</el-button>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="parsingPanel">
			<el-col :span="24">
				<el-card>
					<h3>试题解析</h3>
					<p>
						ここでは、主にをキャッシュするために、キープアライブのレイヤーがapp-mainの外側にラップされ、ページのtabs-viewタグナビゲーションと組み合わせて使用されます。
						トランジションは、ページ間のトランジションアニメーションを定義します。必要に応じて、トランジションアニメーションを自分で変更できます。 関連文書。
						デフォルトでは、2つの遷 移アニメーション、フェードとtransform-transformが提供されています特定のcss実装については、transition.scssを参照してください。
						調整する必要がある場合は、 でトランジションの名前を調整できます。
					</p>
				</el-card>
			</el-col>
		</el-row>
		<el-row v-if="answerPanel">
			<el-col :span="24">
				<el-card>
					<el-table :data="answerData" style="width: 100%">
						<el-table-column prop="start" label="起始" width="180" />
						<el-table-column prop="end" label="结束" width="180" />
						<el-table-column prop="data" label="答案" />
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	
	
	</div>
</template>
<script>
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer';
import SpectrogramPlugin from 'wavesurfer.js/src/plugin/spectrogram.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
import { Icon } from 'vant';
export default {
	components: {
		[Icon.name]: Icon
	},
	data: function() {
		return {
			title: 'wavesudfer',
			color: '',
			wavesurfer: null,
			answerPanel: false,
			parsingPanel: false,
			appointTime: 1,
			textarea: '雨やみを待っていた。 test Adub',
			modeValue: true,
			message: 'Hello Vue.js!',
			isPlay: false,
			ChannelValue: 'dbChannels',
			Channels: 'dbChannels',
			ChannelsSelect: [
				{
					value: 'dbChannels',
					label: '双声道'
				},
				{
					value: 'leftChannels',
					label: '左声道',
					disabled: true
				},
				{
					value: 'rightChannels',
					label: '右声道',
					disabled: true
				}
			],
			noteForm: {
				startTime: '',
				endTime: '',
				data: {
					note: ''
				}
			},
			ppt: false,
			ypt: false,
			ds: 1.0,
			zoomValue: 100,
			zoomMin: 100,
			noteData: [
				{
					start: 1.1,
					end: 4.8,
					data: { note: '发送到发送到发送到' },
					edit: false
				},
				{
					start: 5.3,
					end: 6.6,
					data: { note: '发送到发送到发送到22' },
					edit: false
				},
				{
					start: 7.3,
					end: 9.6,
					data: { note: '发送到发送到发送到33' },
					edit: false
				},
				{
					start: 10.9,
					end: 16.6,
					data: { note: '发送到发送到发送到444' },
					edit: false
				},
				{
					start: 17.3,
					end: 21.6,
					data: { note: '发送到发送到发送到569898' },
					edit: false
				}
			],
			answerData: [
				{
					start: 1.1,
					end: 4.8,
					data: 'ユニバーサルリーディングスキル'
				},
				{
					start: 5.3,
					end: 6.6,
					data: 'レベルKFCニューアーククリスチャンの'
				},
				{
					start: 7.3,
					end: 9.6,
					data: '出入り口近くの泌尿器科を読んだ後、支払います'
				},
				{
					start: 10.9,
					end: 16.6,
					data: 'KFCニューアーククリスチャンの出入り口近くの泌'
				},
				{
					start: 17.3,
					end: 21.6,
					data: '尿器科を読んだ後、支払いを済ませたら、カダワで買ったラムの味をご覧ください。'
				}
			],
			colorMap: [
				[0, 0, 0, 1],
				[0.011764705882352941, 0, 0, 1],
				[0.023529411764705882, 0, 0, 1],
				[0.03529411764705882, 0, 0, 1],
				[0.047058823529411764, 0, 0, 1],
				[0.058823529411764705, 0, 0, 1],
				[0.07058823529411765, 0, 0, 1],
				[0.08235294117647059, 0, 0, 1],
				[0.09411764705882353, 0, 0, 1],
				[0.10588235294117647, 0, 0, 1],
				[0.11764705882352941, 0, 0, 1],
				[0.12941176470588237, 0, 0, 1],
				[0.1411764705882353, 0, 0, 1],
				[0.15294117647058825, 0, 0, 1],
				[0.16470588235294117, 0, 0, 1],
				[0.17647058823529413, 0, 0, 1],
				[0.18823529411764706, 0, 0, 1],
				[0.2, 0, 0, 1],
				[0.21176470588235294, 0, 0, 1],
				[0.2235294117647059, 0, 0, 1],
				[0.23529411764705882, 0, 0, 1],
				[0.24705882352941178, 0, 0, 1],
				[0.25882352941176473, 0, 0, 1],
				[0.27058823529411763, 0, 0, 1],
				[0.2823529411764706, 0, 0, 1],
				[0.29411764705882354, 0, 0, 1],
				[0.3058823529411765, 0, 0, 1],
				[0.3176470588235294, 0, 0, 1],
				[0.32941176470588235, 0, 0, 1],
				[0.3411764705882353, 0, 0, 1],
				[0.35294117647058826, 0, 0, 1],
				[0.36470588235294116, 0, 0, 1],
				[0.3764705882352941, 0, 0, 1],
				[0.38823529411764707, 0, 0, 1],
				[0.4, 0, 0, 1],
				[0.4117647058823529, 0, 0, 1],
				[0.4235294117647059, 0, 0, 1],
				[0.43529411764705883, 0, 0, 1],
				[0.4470588235294118, 0, 0, 1],
				[0.4549019607843137, 0, 0, 1],
				[0.4666666666666667, 0, 0, 1],
				[0.47843137254901963, 0, 0, 1],
				[0.49019607843137253, 0, 0, 1],
				[0.5019607843137255, 0, 0, 1],
				[0.5137254901960784, 0, 0, 1],
				[0.5254901960784314, 0, 0, 1],
				[0.5372549019607843, 0, 0, 1],
				[0.5490196078431373, 0, 0, 1],
				[0.5607843137254902, 0, 0, 1],
				[0.5725490196078431, 0, 0, 1],
				[0.5843137254901961, 0, 0, 1],
				[0.596078431372549, 0, 0, 1],
				[0.6078431372549019, 0, 0, 1],
				[0.6196078431372549, 0, 0, 1],
				[0.6313725490196078, 0, 0, 1],
				[0.6431372549019608, 0, 0, 1],
				[0.6549019607843137, 0, 0, 1],
				[0.6666666666666666, 0, 0, 1],
				[0.6784313725490196, 0, 0, 1],
				[0.6901960784313725, 0, 0, 1],
				[0.7019607843137254, 0, 0, 1],
				[0.7137254901960784, 0, 0, 1],
				[0.7254901960784313, 0, 0, 1],
				[0.7372549019607844, 0, 0, 1],
				[0.7490196078431373, 0, 0, 1],
				[0.7607843137254902, 0, 0, 1],
				[0.7725490196078432, 0, 0, 1],
				[0.7843137254901961, 0, 0, 1],
				[0.796078431372549, 0, 0, 1],
				[0.807843137254902, 0, 0, 1],
				[0.8196078431372549, 0, 0, 1],
				[0.8313725490196079, 0, 0, 1],
				[0.8431372549019608, 0, 0, 1],
				[0.8549019607843137, 0, 0, 1],
				[0.8666666666666667, 0, 0, 1],
				[0.8784313725490196, 0, 0, 1],
				[0.8901960784313725, 0, 0, 1],
				[0.9019607843137255, 0, 0, 1],
				[0.9019607843137255, 0.011764705882352941, 0, 1],
				[0.9058823529411765, 0.023529411764705882, 0, 1],
				[0.9058823529411765, 0.03137254901960784, 0, 1],
				[0.9058823529411765, 0.043137254901960784, 0, 1],
				[0.9098039215686274, 0.054901960784313725, 0, 1],
				[0.9098039215686274, 0.06666666666666667, 0, 1],
				[0.9098039215686274, 0.07450980392156863, 0, 1],
				[0.9137254901960784, 0.08627450980392157, 0, 1],
				[0.9137254901960784, 0.09803921568627451, 0, 1],
				[0.9137254901960784, 0.10980392156862745, 0, 1],
				[0.9176470588235294, 0.11764705882352941, 0, 1],
				[0.9176470588235294, 0.12941176470588237, 0, 1],
				[0.9176470588235294, 0.1411764705882353, 0, 1],
				[0.9215686274509803, 0.15294117647058825, 0, 1],
				[0.9215686274509803, 0.1607843137254902, 0, 1],
				[0.9215686274509803, 0.17254901960784313, 0, 1],
				[0.9254901960784314, 0.1843137254901961, 0, 1],
				[0.9254901960784314, 0.19607843137254902, 0, 1],
				[0.9254901960784314, 0.20784313725490197, 0, 1],
				[0.9294117647058824, 0.21568627450980393, 0, 1],
				[0.9294117647058824, 0.22745098039215686, 0, 1],
				[0.9294117647058824, 0.23921568627450981, 0, 1],
				[0.9333333333333333, 0.25098039215686274, 0, 1],
				[0.9333333333333333, 0.25882352941176473, 0, 1],
				[0.9333333333333333, 0.27058823529411763, 0, 1],
				[0.9372549019607843, 0.2823529411764706, 0, 1],
				[0.9372549019607843, 0.29411764705882354, 0, 1],
				[0.9372549019607843, 0.30196078431372547, 0, 1],
				[0.9411764705882353, 0.3137254901960784, 0, 1],
				[0.9411764705882353, 0.3254901960784314, 0, 1],
				[0.9411764705882353, 0.33725490196078434, 0, 1],
				[0.9450980392156862, 0.34509803921568627, 0, 1],
				[0.9450980392156862, 0.3568627450980392, 0, 1],
				[0.9450980392156862, 0.3686274509803922, 0, 1],
				[0.9490196078431372, 0.3803921568627451, 0, 1],
				[0.9490196078431372, 0.38823529411764707, 0, 1],
				[0.9490196078431372, 0.4, 0, 1],
				[0.9529411764705882, 0.4117647058823529, 0, 1],
				[0.9529411764705882, 0.4235294117647059, 0, 1],
				[0.9529411764705882, 0.43529411764705883, 0, 1],
				[0.9529411764705882, 0.44313725490196076, 0, 1],
				[0.9568627450980393, 0.4549019607843137, 0, 1],
				[0.9568627450980393, 0.4666666666666667, 0, 1],
				[0.9568627450980393, 0.47843137254901963, 0, 1],
				[0.9607843137254902, 0.48627450980392156, 0, 1],
				[0.9607843137254902, 0.4980392156862745, 0, 1],
				[0.9607843137254902, 0.5098039215686274, 0, 1],
				[0.9647058823529412, 0.5215686274509804, 0, 1],
				[0.9647058823529412, 0.5294117647058824, 0, 1],
				[0.9647058823529412, 0.5411764705882353, 0, 1],
				[0.9686274509803922, 0.5529411764705883, 0, 1],
				[0.9686274509803922, 0.5647058823529412, 0, 1],
				[0.9686274509803922, 0.5725490196078431, 0, 1],
				[0.9725490196078431, 0.5843137254901961, 0, 1],
				[0.9725490196078431, 0.596078431372549, 0, 1],
				[0.9725490196078431, 0.6078431372549019, 0, 1],
				[0.9764705882352941, 0.6196078431372549, 0, 1],
				[0.9764705882352941, 0.6274509803921569, 0, 1],
				[0.9764705882352941, 0.6392156862745098, 0, 1],
				[0.9803921568627451, 0.6509803921568628, 0, 1],
				[0.9803921568627451, 0.6627450980392157, 0, 1],
				[0.9803921568627451, 0.6705882352941176, 0, 1],
				[0.984313725490196, 0.6823529411764706, 0, 1],
				[0.984313725490196, 0.6941176470588235, 0, 1],
				[0.984313725490196, 0.7058823529411765, 0, 1],
				[0.9882352941176471, 0.7137254901960784, 0, 1],
				[0.9882352941176471, 0.7254901960784313, 0, 1],
				[0.9882352941176471, 0.7372549019607844, 0, 1],
				[0.9921568627450981, 0.7490196078431373, 0, 1],
				[0.9921568627450981, 0.7568627450980392, 0, 1],
				[0.9921568627450981, 0.7686274509803922, 0, 1],
				[0.996078431372549, 0.7803921568627451, 0, 1],
				[0.996078431372549, 0.792156862745098, 0, 1],
				[0.996078431372549, 0.8, 0, 1],
				[1, 0.8117647058823529, 0, 1],
				[1, 0.8235294117647058, 0, 1],
				[1, 0.8235294117647058, 0.011764705882352941, 1],
				[1, 0.8274509803921568, 0.0196078431372549, 1],
				[1, 0.8274509803921568, 0.03137254901960784, 1],
				[1, 0.8313725490196079, 0.0392156862745098, 1],
				[1, 0.8313725490196079, 0.050980392156862744, 1],
				[1, 0.8352941176470589, 0.058823529411764705, 1],
				[1, 0.8352941176470589, 0.07058823529411765, 1],
				[1, 0.8392156862745098, 0.0784313725490196, 1],
				[1, 0.8392156862745098, 0.09019607843137255, 1],
				[1, 0.8392156862745098, 0.09803921568627451, 1],
				[1, 0.8431372549019608, 0.10980392156862745, 1],
				[1, 0.8431372549019608, 0.11764705882352941, 1],
				[1, 0.8470588235294118, 0.12941176470588237, 1],
				[1, 0.8470588235294118, 0.13725490196078433, 1],
				[1, 0.8509803921568627, 0.14901960784313725, 1],
				[1, 0.8509803921568627, 0.1568627450980392, 1],
				[1, 0.8549019607843137, 0.16862745098039217, 1],
				[1, 0.8549019607843137, 0.17647058823529413, 1],
				[1, 0.8549019607843137, 0.18823529411764706, 1],
				[1, 0.8588235294117647, 0.19607843137254902, 1],
				[1, 0.8588235294117647, 0.20784313725490197, 1],
				[1, 0.8627450980392157, 0.21568627450980393, 1],
				[1, 0.8627450980392157, 0.22745098039215686, 1],
				[1, 0.8666666666666667, 0.23529411764705882, 1],
				[1, 0.8666666666666667, 0.24705882352941178, 1],
				[1, 0.8666666666666667, 0.2549019607843137, 1],
				[1, 0.8705882352941177, 0.26666666666666666, 1],
				[1, 0.8705882352941177, 0.27450980392156865, 1],
				[1, 0.8745098039215686, 0.28627450980392155, 1],
				[1, 0.8745098039215686, 0.29411764705882354, 1],
				[1, 0.8784313725490196, 0.3058823529411765, 1],
				[1, 0.8784313725490196, 0.3137254901960784, 1],
				[1, 0.8823529411764706, 0.3254901960784314, 1],
				[1, 0.8823529411764706, 0.3333333333333333, 1],
				[1, 0.8823529411764706, 0.34509803921568627, 1],
				[1, 0.8862745098039215, 0.35294117647058826, 1],
				[1, 0.8862745098039215, 0.36470588235294116, 1],
				[1, 0.8901960784313725, 0.37254901960784315, 1],
				[1, 0.8901960784313725, 0.3843137254901961, 1],
				[1, 0.8941176470588236, 0.39215686274509803, 1],
				[1, 0.8941176470588236, 0.403921568627451, 1],
				[1, 0.8980392156862745, 0.4117647058823529, 1],
				[1, 0.8980392156862745, 0.4235294117647059, 1],
				[1, 0.8980392156862745, 0.43137254901960786, 1],
				[1, 0.9019607843137255, 0.44313725490196076, 1],
				[1, 0.9019607843137255, 0.45098039215686275, 1],
				[1, 0.9058823529411765, 0.4627450980392157, 1],
				[1, 0.9058823529411765, 0.47058823529411764, 1],
				[1, 0.9098039215686274, 0.4823529411764706, 1],
				[1, 0.9098039215686274, 0.49019607843137253, 1],
				[1, 0.9137254901960784, 0.5019607843137255, 1],
				[1, 0.9137254901960784, 0.5098039215686274, 1],
				[1, 0.9137254901960784, 0.5215686274509804, 1],
				[1, 0.9176470588235294, 0.5294117647058824, 1],
				[1, 0.9176470588235294, 0.5411764705882353, 1],
				[1, 0.9215686274509803, 0.5490196078431373, 1],
				[1, 0.9215686274509803, 0.5607843137254902, 1],
				[1, 0.9254901960784314, 0.5686274509803921, 1],
				[1, 0.9254901960784314, 0.5803921568627451, 1],
				[1, 0.9254901960784314, 0.5882352941176471, 1],
				[1, 0.9294117647058824, 0.6, 1],
				[1, 0.9294117647058824, 0.6078431372549019, 1],
				[1, 0.9333333333333333, 0.6196078431372549, 1],
				[1, 0.9333333333333333, 0.6274509803921569, 1],
				[1, 0.9372549019607843, 0.6392156862745098, 1],
				[1, 0.9372549019607843, 0.6470588235294118, 1],
				[1, 0.9411764705882353, 0.6588235294117647, 1],
				[1, 0.9411764705882353, 0.6666666666666666, 1],
				[1, 0.9411764705882353, 0.6784313725490196, 1],
				[1, 0.9450980392156862, 0.6862745098039216, 1],
				[1, 0.9450980392156862, 0.6980392156862745, 1],
				[1, 0.9490196078431372, 0.7058823529411765, 1],
				[1, 0.9490196078431372, 0.7176470588235294, 1],
				[1, 0.9529411764705882, 0.7254901960784313, 1],
				[1, 0.9529411764705882, 0.7372549019607844, 1],
				[1, 0.9568627450980393, 0.7450980392156863, 1],
				[1, 0.9568627450980393, 0.7568627450980392, 1],
				[1, 0.9568627450980393, 0.7647058823529411, 1],
				[1, 0.9607843137254902, 0.7764705882352941, 1],
				[1, 0.9607843137254902, 0.7843137254901961, 1],
				[1, 0.9647058823529412, 0.796078431372549, 1],
				[1, 0.9647058823529412, 0.803921568627451, 1],
				[1, 0.9686274509803922, 0.8156862745098039, 1],
				[1, 0.9686274509803922, 0.8235294117647058, 1],
				[1, 0.9725490196078431, 0.8352941176470589, 1],
				[1, 0.9725490196078431, 0.8431372549019608, 1],
				[1, 0.9725490196078431, 0.8549019607843137, 1],
				[1, 0.9764705882352941, 0.8627450980392157, 1],
				[1, 0.9764705882352941, 0.8745098039215686, 1],
				[1, 0.9803921568627451, 0.8823529411764706, 1],
				[1, 0.9803921568627451, 0.8941176470588236, 1],
				[1, 0.984313725490196, 0.9019607843137255, 1],
				[1, 0.984313725490196, 0.9137254901960784, 1],
				[1, 0.984313725490196, 0.9215686274509803, 1],
				[1, 0.9882352941176471, 0.9333333333333333, 1],
				[1, 0.9882352941176471, 0.9411764705882353, 1],
				[1, 0.9921568627450981, 0.9529411764705882, 1],
				[1, 0.9921568627450981, 0.9607843137254902, 1],
				[1, 0.996078431372549, 0.9725490196078431, 1],
				[1, 0.996078431372549, 0.9803921568627451, 1],
				[1, 1, 0.9921568627450981, 1],
				[1, 1, 1, 1]
			],
			value: 0
		};
	},
	created() {
		
	},
	mounted() {
		console.log(WaveSurfer,1);
		// console.log(SpectrogramPlugin,2);
		// console.log(CursorPlugin,3);
		// console.log(Timeline,4);
		// console.log(Regions,5);
		let that = this;
		this.$nextTick(() => {
		// 	this.wavesurfer = WaveSurfer.create({
		// 		container: that.$refs.waveform,
		// 		waveColor: '#409EFF',
		// 		progressColor: 'blue',
		// 		backend: 'MediaElement',
		// 		mediaControls: false,
		// 		audioRate: '1',
		// 		//使用时间轴插件
		// 		plugins: [
		// 			Timeline.create({
		// 				container: '#wave-timeline'
		// 			})
		// 		]
		// 
		// 	  });
		// 	// console.log(('../../assets/Beyond.mp3'))
		// 	this.wavesurfer.load(require('@/assets/dunjia.mp3'));
		// 	this.wavesurfer.on('error', function(err) {
		// 		console.log(err);
		// 	});
			this.wavesurfer = WaveSurfer.create({
				container: that.$refs.waveform,
				waveColor: '#FF55C5',
				progressColor: '#00BFBF',
				split: false,
				minPxPerSec: 8,
				height: 180,
				barWidth: 1,
				barHeight: 1.5,
				splitChannels: false,
				audioRate: '1',
				plugins: [
					SpectrogramPlugin.create({
						container: '#wave-spectrogram',
						labels: true,
						colorMap: that.colorMap
					}),
					CursorPlugin.create({
						showTime: true,
						opacity: 0.2,
						customShowTimeStyle: {
							'background-color': '#000',
							color: '#fff',
							padding: '2px',
							'font-size': '10px'
						}
					}),
					Timeline.create({
						container: '#wave-timeline'
					}),
					Regions.create()
				]
			});
			console.log(that.$refs.waveform)
			this.wavesurfer.load(require('@/assets/dunjia.mp3'));
			this.value = this.wavesurfer.getVolume() * 100;
			this.zoomValue = this.wavesurfer.params.minPxPerSec;
			this.zoomMin = this.wavesurfer.params.minPxPerSec;
			this.wavesurfer.zoom(Number(this.zoomValue));
			this.wavesurfer.panner = this.wavesurfer.backend.ac.createPanner();
			this.wavesurfer.backend.setFilter(this.wavesurfer.panner);
			const _this = this;
			this.wavesurfer.on('ready', function() {
				_this.wavesurfer.enableDragSelection({
					color: _this.randomColor(0.1)
				});
				_this.loadRegions(_this.noteData);
			});
			this.wavesurfer.on('region-click', function(region, e) {
				e.stopPropagation();
				e.shiftKey ? region.playLoop() : region.play();
			});

			this.wavesurfer.on('region-click', this.editAnnotation);
			this.wavesurfer.on('region-updated', this.saveRegions);
			this.wavesurfer.on('region-removed', this.saveRegions);
			this.wavesurfer.on('region-in', this.showNote);
			this.wavesurfer.on('region-play', function(region) {
				region.once('out', function() {
					this.wavesurfer.play(region.start);
					this.wavesurfer.pause();
				});
			});
		});
	},
	methods: {
		playMusic() {
		  //"播放/暂停"按钮的单击触发事件，暂停的话单击则播放，正在播放的话单击则暂停播放
		  this.wavesurfer.playPause.bind(this.wavesurfer)()
		},
		modeSwitch() {
			this.modeValue = !this.modeValue;
		},
		plays() {
			this.isPlay = !this.isPlay;
			this.wavesurfer.playPause();
		},
		rew() {
			this.wavesurfer.skip(-3);
		},
		speek() {
			this.wavesurfer.skip(3);
		},
		replay() {
			this.isPlay = false;
			this.wavesurfer.stop();
		},
		DoubleSpeed(c, o) {
			this.wavesurfer.setPlaybackRate(c);
		},
		// 声道
		channelsChange(value) {
			const _this = this;
			console.log(value);
			switch (value) {
				case 'dbChannels':
					_this.wavesurfer.panner.setPosition(0, 0, 0);
					break;
				case 'leftChannels':
					_this.wavesurfer.panner.setPosition(-0.7, 0, 0);
					break;
				case 'rightChannels':
					_this.wavesurfer.panner.setPosition(0.7, 0, 0);
					break;
			}
		},
		// 缩放百分比显示格式
		formatZoom(val) {
			return val + 100 + ' 像素 / 秒';
		},
		// 缩放监听
		zoomChange() {
			this.wavesurfer.zoom(Number(this.zoomValue));
		},
		// 新建
		saveRegions() {
			const _this = this;
			this.noteData = Object.keys(_this.wavesurfer.regions.list).map(function(id) {
				console.log(id);
				const region = _this.wavesurfer.regions.list[id];
				// _this.noteForm.id = id
				// _this.noteForm.edit = false
				// _this.noteForm.startTime = Math.round(region.start * 10) / 10
				// _this.noteForm.endTime = Math.round(region.end * 10) / 10
				// _this.noteForm.data.note = region.data.note || ''
				return {
					id: id,
					edit: false,
					start: Math.round(region.start * 10) / 10,
					end: Math.round(region.end * 10) / 10,
					attributes: region.attributes,
					data: { note: region.data.note || '' }
				};
			});
		},
		// 从localStorage加载区域
		loadRegions(regions) {
			const _this = this;
			regions.forEach(function(region) {
				region.color = _this.randomColor(0.1);
				_this.wavesurfer.addRegion(region);
			});
		},
		// RGB颜色生成器
		randomColor(alpha) {
			return 'rgba(' + [~~(Math.random() * 255), ~~(Math.random() * 255), ~~(Math.random() * 255), alpha || 1] + ')';
		},
		// 编辑保存
		editAnnotation(region) {
			// this.onSaveNote = function(row) {
			//   row.edit = false
			//
			//   region.update({
			//     start: Math.round(region.start * 10) / 10,
			//     end: Math.round(region.end * 10) / 10,
			//     data: {
			//       note: row.note || ''
			//     }
			//   })
			// }
		},
		showNote(region) {
			console.log(region)
			if (!this.showNote.el) {
				this.showNote.el = document.querySelector('#subtitle');
			}
			this.showNote.el.textContent = region.data.note || '–';
		},
		onSaveNote(row) {
			row.edit = !row.edit;
			const region = this.wavesurfer.regions.list[row.id];
			console.log(row.data.note);
			region.update({
				start: row.start,
				end: row.end,
				data: {
					note: row.data.note || ''
				}
			});
		},
		onDeleteNote() {},
		setVolume(val) {
			this.wavesurfer.setVolume(val / 100);
		},
		formatS(s) {
			const minute = Math.floor(s / 60);
			const second = Math.floor(s - minute * 60);
			const centisecond = Math.floor((s - minute * 60 - second) * 100);
			return (minute.toString().length === 1 ? '0' + minute : minute) + ':' + (second.toString().length === 1 ? '0' + second : second) + ':' + centisecond + "'";
		},
		appointPlay() {},
		submitAnswer() {}
	}
};
</script>

<style>
#waveform {
	position: relative;
}
.mt-20 {
	margin-top: 20px;
}
.mb-20 {
	margin-bottom: 20px;
}
.mt-30 {
	margin-top: 30px;
}
.el-button.is-circle {
	padding: 12px;
}
.my-btn {
	font-size: 42px;
}
.my-btn2 {
	width: 40px;
}
.my-select {
	width: 180px;
	height: 70px !important;
	line-height: 70px;
}
.span {
	border: 2px solid #3e3a39;
	display: inline-block;
	margin-left: 20px;
	height: 44px;
	margin-right: 20px;
}
.el-card__body {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>

<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >菜单管理</label>
      <div align="right" class="el-form-item__content">
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
    </div>
  </div>

  <div class="box">

    <table-tree :columns="columns" :treeStructure="true" :data-source="menuTree" :defaultExpandAll="true"></table-tree>


  </div>
  <el-dialog :title="saveFormName" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="100px" :rules="rules" ref="saveForm">
      <m-box>
        <m-container fluid >
          <m-row>
            <m-col md="6">
              <el-form-item label="上级菜单：">
                <!--<select-tree :data="menuTree" model="saveBean.parentId"></select-tree>-->
                <el-cascader change-on-select expand-trigger="hover" :show-all-levels="false" :options="menuTree" style="width: 100%"
                             @change="handleChange" v-model="saveBean.pathArray" :props="{value:'id',label:'name'}">
                </el-cascader>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="菜单名称：" prop="name">
                <el-input v-model="saveBean.name"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="选择图标：">
                <el-popover v-model="popoverVisible" :visible-arrow="false" width="860">
                  <el-tabs v-model="activeTab">
                    <el-tab-pane label="el-icon" name="first">
                      <div class="page-component">
                        <section class="content">
                          <ul class="icon-list">
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-info'; popoverVisible=false"><span><i class="el-icon-info"></i><span class="icon-name">el-icon-info</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-error'; popoverVisible=false"><span><i class="el-icon-error"></i><span class="icon-name">el-icon-error</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-success'; popoverVisible=false"><span><i class="el-icon-success"></i><span class="icon-name">el-icon-success</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-warning'; popoverVisible=false"><span><i class="el-icon-warning"></i><span class="icon-name">el-icon-warning</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-question'; popoverVisible=false"><span><i class="el-icon-question"></i><span class="icon-name">el-icon-question</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-d-caret'; popoverVisible=false"><span><i class="el-icon-d-caret"></i><span class="icon-name">el-icon-d-caret</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-tickets'; popoverVisible=false"><span><i class="el-icon-tickets"></i><span class="icon-name">el-icon-tickets</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-document'; popoverVisible=false"><span><i class="el-icon-document"></i><span class="icon-name">el-icon-document</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-goods'; popoverVisible=false"><span><i class="el-icon-goods"></i><span class="icon-name">el-icon-goods</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-sold-out'; popoverVisible=false"><span><i class="el-icon-sold-out"></i><span class="icon-name">el-icon-sold-out</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-news'; popoverVisible=false"><span><i class="el-icon-news"></i><span class="icon-name">el-icon-news</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-message'; popoverVisible=false"><span><i class="el-icon-message"></i><span class="icon-name">el-icon-message</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-date'; popoverVisible=false"><span><i class="el-icon-date"></i><span class="icon-name">el-icon-date</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-printer'; popoverVisible=false"><span><i class="el-icon-printer"></i><span class="icon-name">el-icon-printer</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-time'; popoverVisible=false"><span><i class="el-icon-time"></i><span class="icon-name">el-icon-time</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-bell'; popoverVisible=false"><span><i class="el-icon-bell"></i><span class="icon-name">el-icon-bell</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-mobile-phone'; popoverVisible=false"><span><i class="el-icon-mobile-phone"></i><span class="icon-name">el-icon-mobile-phone</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-service'; popoverVisible=false"><span><i class="el-icon-service"></i><span class="icon-name">el-icon-service</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-view'; popoverVisible=false"><span><i class="el-icon-view"></i><span class="icon-name">el-icon-view</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-menu'; popoverVisible=false"><span><i class="el-icon-menu"></i><span class="icon-name">el-icon-menu</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-star-on'; popoverVisible=false"><span><i class="el-icon-star-on"></i><span class="icon-name">el-icon-star-on</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-star-off'; popoverVisible=false"><span><i class="el-icon-star-off"></i><span class="icon-name">el-icon-star-off</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-location'; popoverVisible=false"><span><i class="el-icon-location"></i><span class="icon-name">el-icon-location</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-location-outline'; popoverVisible=false"><span><i class="el-icon-location-outline"></i><span class="icon-name">el-icon-location-outline</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-phone'; popoverVisible=false"><span><i class="el-icon-phone"></i><span class="icon-name">el-icon-phone</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-phone-outline'; popoverVisible=false"><span><i class="el-icon-phone-outline"></i><span class="icon-name">el-icon-phone-outline</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-picture'; popoverVisible=false"><span><i class="el-icon-picture"></i><span class="icon-name">el-icon-picture</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-picture-outline'; popoverVisible=false"><span><i class="el-icon-picture-outline"></i><span class="icon-name">el-icon-picture-outline</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-delete'; popoverVisible=false"><span><i class="el-icon-delete"></i><span class="icon-name">el-icon-delete</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-search'; popoverVisible=false"><span><i class="el-icon-search"></i><span class="icon-name">el-icon-search</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-edit'; popoverVisible=false"><span><i class="el-icon-edit"></i><span class="icon-name">el-icon-edit</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-edit-outline'; popoverVisible=false"><span><i class="el-icon-edit-outline"></i><span class="icon-name">el-icon-edit-outline</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-rank'; popoverVisible=false"><span><i class="el-icon-rank"></i><span class="icon-name">el-icon-rank</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-refresh'; popoverVisible=false"><span><i class="el-icon-refresh"></i><span class="icon-name">el-icon-refresh</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-share'; popoverVisible=false"><span><i class="el-icon-share"></i><span class="icon-name">el-icon-share</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-setting'; popoverVisible=false"><span><i class="el-icon-setting"></i><span class="icon-name">el-icon-setting</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-upload'; popoverVisible=false"><span><i class="el-icon-upload"></i><span class="icon-name">el-icon-upload</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-download'; popoverVisible=false"><span><i class="el-icon-download"></i><span class="icon-name">el-icon-download</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'el-icon-loading'; popoverVisible=false"><span><i class="el-icon-loading"></i><span class="icon-name">el-icon-loading</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="Font Awesome" name="second">
                      <div class="page-component">
                        <section class="content">
                          <ul class="icon-list">
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-address-book'; popoverVisible=false"><span><i class="fa fa-address-book"></i><span class="icon-name">fa-address-book</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-address-book-o'; popoverVisible=false"><span><i class="fa fa-address-book-o"></i><span class="icon-name">fa-address-book-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-adjust'; popoverVisible=false"><span><i class="fa fa-adjust"></i><span class="icon-name">fa-adjust</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-anchor'; popoverVisible=false"><span><i class="fa fa-anchor"></i><span class="icon-name">fa-anchor</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-arrows'; popoverVisible=false"><span><i class="fa fa-arrows"></i><span class="icon-name">fa-arrows</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-asterisk'; popoverVisible=false"><span><i class="fa fa-asterisk"></i><span class="icon-name">fa-asterisk</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-at'; popoverVisible=false"><span><i class="fa fa-at"></i><span class="icon-name">fa-at</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-asl-interpreting'; popoverVisible=false"><span><i class="fa fa-asl-interpreting"></i><span class="icon-name">fa-asl-interpreting</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-audio-description'; popoverVisible=false"><span><i class="fa fa-audio-description"></i><span class="icon-name">fa-audio-description</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-automobile'; popoverVisible=false"><span><i class="fa fa-automobile"></i><span class="icon-name">fa-automobile</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-balance-scale'; popoverVisible=false"><span><i class="fa fa-balance-scale"></i><span class="icon-name">fa-balance-scale</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bank'; popoverVisible=false"><span><i class="fa fa-bank"></i><span class="icon-name">fa-bank</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bar-chart'; popoverVisible=false"><span><i class="fa fa-bar-chart"></i><span class="icon-name">fa-bar-chart</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bars'; popoverVisible=false"><span><i class="fa fa-bars"></i><span class="icon-name">fa-bars</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bath'; popoverVisible=false"><span><i class="fa fa-bath"></i><span class="icon-name">fa-bath</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-battery'; popoverVisible=false"><span><i class="fa fa-battery"></i><span class="icon-name">fa-battery</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-battery-0'; popoverVisible=false"><span><i class="fa fa-battery-0"></i><span class="icon-name">fa-battery-0</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-battery-1'; popoverVisible=false"><span><i class="fa fa-battery-1"></i><span class="icon-name">fa-battery-1</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-battery-2'; popoverVisible=false"><span><i class="fa fa-battery-2"></i><span class="icon-name">fa-battery-2</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-battery-3'; popoverVisible=false"><span><i class="fa fa-battery-3"></i><span class="icon-name">fa-battery-3</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bed'; popoverVisible=false"><span><i class="fa fa-bed"></i><span class="icon-name">fa-bed</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-beer'; popoverVisible=false"><span><i class="fa fa-beer"></i><span class="icon-name">fa-beer</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bell'; popoverVisible=false"><span><i class="fa fa-bell"></i><span class="icon-name">fa-bell</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-binoculars'; popoverVisible=false"><span><i class="fa fa-binoculars"></i><span class="icon-name">fa-binoculars</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bicycle'; popoverVisible=false"><span><i class="fa fa-bicycle"></i><span class="icon-name">fa-bicycle</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-birthday-cake'; popoverVisible=false"><span><i class="fa fa-birthday-cake"></i><span class="icon-name">fa-birthday-cake</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bluetooth'; popoverVisible=false"><span><i class="fa fa-bluetooth"></i><span class="icon-name">fa-bluetooth</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bluetooth-b'; popoverVisible=false"><span><i class="fa fa-bluetooth-b"></i><span class="icon-name">fa-bluetooth-b</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bolt'; popoverVisible=false"><span><i class="fa fa-bolt"></i><span class="icon-name">fa-bolt</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bomb'; popoverVisible=false"><span><i class="fa fa-bomb"></i><span class="icon-name">fa-bomb</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-book'; popoverVisible=false"><span><i class="fa fa-book"></i><span class="icon-name">fa-book</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bookmark'; popoverVisible=false"><span><i class="fa fa-bookmark"></i><span class="icon-name">fa-bookmark</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-briefcase'; popoverVisible=false"><span><i class="fa fa-briefcase"></i><span class="icon-name">fa-briefcase</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bug'; popoverVisible=false"><span><i class="fa fa-bug"></i><span class="icon-name">fa-bug</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bullhorn'; popoverVisible=false"><span><i class="fa fa-bullhorn"></i><span class="icon-name">fa-bullhorn</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-calculator'; popoverVisible=false"><span><i class="fa fa-calculator"></i><span class="icon-name">fa-calculator</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-calendar'; popoverVisible=false"><span><i class="fa fa-calendar"></i><span class="icon-name">fa-calendar</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-camera'; popoverVisible=false"><span><i class="fa fa-camera"></i><span class="icon-name">fa-camera</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cc'; popoverVisible=false"><span><i class="fa fa-cc"></i><span class="icon-name">fa-cc</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-clone'; popoverVisible=false"><span><i class="fa fa-clone"></i><span class="icon-name">fa-clone</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cloud'; popoverVisible=false"><span><i class="fa fa-cloud"></i><span class="icon-name">fa-cloud</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-code'; popoverVisible=false"><span><i class="fa fa-code"></i><span class="icon-name">fa-code</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-coffee'; popoverVisible=false"><span><i class="fa fa-coffee"></i><span class="icon-name">fa-coffee</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cog'; popoverVisible=false"><span><i class="fa fa-cog"></i><span class="icon-name">fa-cog</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cogs'; popoverVisible=false"><span><i class="fa fa-cogs"></i><span class="icon-name">fa-cogs</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-comment'; popoverVisible=false"><span><i class="fa fa-comment"></i><span class="icon-name">fa-comment</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-comments'; popoverVisible=false"><span><i class="fa fa-comments"></i><span class="icon-name">fa-comments</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                  </el-tabs>
                  <el-input v-model="saveBean.icon" :maxlength="20" slot="reference" readonly onclick="popoverVisible=true">
                    <template slot="prepend"><i :class="saveBean.icon"></i></template>
                  </el-input>
                </el-popover>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="链接：">
                <el-input v-model="saveBean.href"></el-input>
              </el-form-item>
            </m-col>
            <!--<m-col md="6">
              <el-form-item label="目标：">
                <el-input v-model="saveBean.target"></el-input>
              </el-form-item>
            </m-col>-->
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="权限标识：">
                <el-input v-model="saveBean.permission"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="排序(升序)：">
                <el-input type="number" :controls="false" v-model="saveBean.sort" :min="1" :max="999999999"
                          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="是否显示：">
                <el-checkbox v-model="saveBean.isShow"></el-checkbox>
              </el-form-item>
            </m-col>
          </m-row>
        </m-container>
      </m-box>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="saveFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save('saveForm')">保 存</el-button>
    </div>
  </el-dialog>

</div>
</template>
<style>
  .box .box-header .box-title {
    font-size: 18px;
    font-weight: 100;
    margin: 0;
    float: left;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
  }
  .icon-list li {
    float: left;
    width: 12.25%;
    text-align: center;
    height: 100px;
    line-height: 100px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .page-component .content>ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border-right: none;
    border-bottom: none;
    border-radius: 4px;
  }
  .page-component .content>ul:not(.timeline) {
    margin: 10px 10px;
    padding: 0 0 10px 20px;
    font-size: 14px;
    color: #5e6d82;
    line-height: 2em;
  }
  .icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
  }
  .icon-list li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
    color: #606266;
  }
  .icon-list li span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    color: #99a9bf;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        columns: [
          {
            text: '菜单',
            dataIndex: 'name'
          },
          {
            text: '链接',
            dataIndex: 'href'
          },
          {
            text: '路径',
            dataIndex: 'path'
          },
          {
            text: '权限',
            dataIndex: 'permission'
          },
          {
            text: '备注',
            dataIndex: 'remark'
          }
        ],
        menuTree: [],
        saveBean: {},
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        popoverVisible: false,
        isLoading: true,
        activeTab: 'first',
        rules: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      reset () {
        this.list()
      },
      handleChange (val) {
        this.saveBean.parentId = val[val.length - 1]
        console.log(this.saveBean)
      },
      selectParentMenu (val) {
        this.saveBean.parentId = val[val.length - 1]
        console.log(this.saveBean)
      },
      list () {
        this.isLoading = true
        this.$http.get(this.global.serverPath + 'menu/tree')
          .then((response) => {
            this.isLoading = false
            this.menuTree = response.data
          }, (response) => {
            this.isLoading = false
            console.log('error ==== ' + response)
          })
      },
      getById (obj) {
        this.saveFormName = '编辑'
        console.log('getById ==== id = ' + obj.id)
        this.$http.get(this.global.serverPath + 'menu/' + obj.id)
          .then((response) => {
            this.saveBean = response.data
            var pathArray = this.saveBean.path.split('/')
            //  删除第一个空字符串 splice第一个参数是从第几个元素开始删除， 第2个参数是删除多少个
            pathArray.splice(0, 1)
            //  删除最后一个本身的id
            pathArray.splice(pathArray.length - 1, 1)
            if (pathArray.length === 0) {
              pathArray.push('0')
            }
            this.saveBean.pathArray = pathArray
            if (this.saveBean.org != null && this.saveBean.org.id != null) {
              this.$refs.orgTree.setCurrentKey(this.saveBean.org.id)
            }
            this.saveFormVisible = true
          }, (response) => {
            console.log('error ==== ' + response)
          })
      },
      addChild (obj) {
        this.saveFormName = '添加下级'
        var pathArray = obj.path.split('/')
        //  删除第一个空字符串 splice第一个参数是从第几个元素开始删除， 第2个参数是删除多少个
        pathArray.splice(0, 1)
        this.saveBean.pathArray = pathArray
        if (obj.children != null) {
          this.saveBean.sort = (obj.children.length + 1) * 10
        } else {
          this.saveBean.sort = 10
        }
        this.saveBean.parentId = obj.id
        this.saveFormVisible = true
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'menu', this.saveBean, {emulateJSON: true})
              .then((response) => {
                this.saveFormVisible = false
                this.list()
                this.$message(response.msg)
              }, (response) => {
                console.log('error ==== ' + response)
                // return this.$message.warning('222')
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      del (obj) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.global.serverPath + 'menu', {params: {'id': obj.id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
              // this.getOrgTree()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
          // this.$message('已取消删除')
        })
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = {}
          this.$refs['saveForm'].resetFields()
          this.saveFormName = '新增'
        } else {

        }
      },
      searchShow (val, oldVal) {
        if (val === true) {
          this.searchBtnName = '隐藏'
        } else {
          this.searchBtnName = '搜索'
        }
      }
    }
  }
</script>

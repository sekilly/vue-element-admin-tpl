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

    <table-tree :columns="columns" :treeStructure="true" :data-source="menuTree" :defaultExpandAll="false"></table-tree>


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
                <el-popover v-model="popoverVisible" :visible-arrow="false" width="860" >
                  <el-tabs v-model="activeTab">

                    <el-tab-pane label="Font Awesome (1)" name="first">
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
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-crosshairs'; popoverVisible=false"><span><i class="fa fa-crosshairs"></i><span class="icon-name">fa-crosshairs</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="Font Awesome (2)" name="second">
                      <div class="page-component">
                        <section class="content">
                          <ul class="icon-list">
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cube'; popoverVisible=false"><span><i class="fa fa-cube"></i><span class="icon-name">fa-cube</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-cubes'; popoverVisible=false"><span><i class="fa fa-cubes"></i><span class="icon-name">fa-cubes</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-dashboard'; popoverVisible=false"><span><i class="fa fa-dashboard"></i><span class="icon-name">fa-dashboard</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-database'; popoverVisible=false"><span><i class="fa fa-database"></i><span class="icon-name">fa-database</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-desktop'; popoverVisible=false"><span><i class="fa fa-desktop"></i><span class="icon-name">fa-desktop</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-diamond'; popoverVisible=false"><span><i class="fa fa-diamond"></i><span class="icon-name">fa-diamond</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-feed'; popoverVisible=false"><span><i class="fa fa-feed"></i><span class="icon-name">fa-feed</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-film'; popoverVisible=false"><span><i class="fa fa-film"></i><span class="icon-name">fa-film</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-fire'; popoverVisible=false"><span><i class="fa fa-fire"></i><span class="icon-name">fa-fire</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-flag'; popoverVisible=false"><span><i class="fa fa-flag"></i><span class="icon-name">fa-flag</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-futbol-o'; popoverVisible=false"><span><i class="fa fa-futbol-o"></i><span class="icon-name">fa-futbol-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-gear'; popoverVisible=false"><span><i class="fa fa-gear"></i><span class="icon-name">fa-gear</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-gears'; popoverVisible=false"><span><i class="fa fa-gears"></i><span class="icon-name">fa-gears</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-gift'; popoverVisible=false"><span><i class="fa fa-gift"></i><span class="icon-name">fa-gift</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-globe'; popoverVisible=false"><span><i class="fa fa-globe"></i><span class="icon-name">fa-globe</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-graduation-cap'; popoverVisible=false"><span><i class="fa fa-graduation-cap"></i><span class="icon-name">fa-graduation-cap</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-group'; popoverVisible=false"><span><i class="fa fa-group"></i><span class="icon-name">fa-group</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-hashtag'; popoverVisible=false"><span><i class="fa fa-hashtag"></i><span class="icon-name">fa-hashtag</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-headphones'; popoverVisible=false"><span><i class="fa fa-headphones"></i><span class="icon-name">fa-headphones</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-heart'; popoverVisible=false"><span><i class="fa fa-heart"></i><span class="icon-name">fa-heart</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-heartbeat'; popoverVisible=false"><span><i class="fa fa-heartbeat"></i><span class="icon-name">fa-heartbeat</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-history'; popoverVisible=false"><span><i class="fa fa-history"></i><span class="icon-name">fa-history</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-image'; popoverVisible=false"><span><i class="fa fa-image"></i><span class="icon-name">fa-image</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-industry'; popoverVisible=false"><span><i class="fa fa-industry"></i><span class="icon-name">fa-industry</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-keyboard-o'; popoverVisible=false"><span><i class="fa fa-keyboard-o"></i><span class="icon-name">fa-keyboard-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-plane'; popoverVisible=false"><span><i class="fa fa-plane"></i><span class="icon-name">fa-plane</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-language'; popoverVisible=false"><span><i class="fa fa-language"></i><span class="icon-name">fa-language</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-life-bouy'; popoverVisible=false"><span><i class="fa fa-life-bouy"></i><span class="icon-name">fa-life-bouy</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-lightbulb-o'; popoverVisible=false"><span><i class="fa fa-lightbulb-o"></i><span class="icon-name">fa-lightbulb-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-line-chart'; popoverVisible=false"><span><i class="fa fa-line-chart"></i><span class="icon-name">fa-line-chart</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-location-arrow'; popoverVisible=false"><span><i class="fa fa-location-arrow"></i><span class="icon-name">fa-location-arrow</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-magnet'; popoverVisible=false"><span><i class="fa fa-magnet"></i><span class="icon-name">fa-magnet</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-map'; popoverVisible=false"><span><i class="fa fa-map"></i><span class="icon-name">fa-map</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-map-marker'; popoverVisible=false"><span><i class="fa fa-map-marker"></i><span class="icon-name">fa-map-marker</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-microchip'; popoverVisible=false"><span><i class="fa fa-microchip"></i><span class="icon-name">fa-microchip</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-microphone'; popoverVisible=false"><span><i class="fa fa-microphone"></i><span class="icon-name">fa-microphone</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-mobile'; popoverVisible=false"><span><i class="fa fa-mobile"></i><span class="icon-name">fa-mobile</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-money'; popoverVisible=false"><span><i class="fa fa-money"></i><span class="icon-name">fa-money</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-music'; popoverVisible=false"><span><i class="fa fa-music"></i><span class="icon-name">fa-music</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-paint-brush'; popoverVisible=false"><span><i class="fa fa-paint-brush"></i><span class="icon-name">fa-paint-brush</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-paper-plane'; popoverVisible=false"><span><i class="fa fa-paper-plane"></i><span class="icon-name">fa-paper-plane</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-paper-plane-o'; popoverVisible=false"><span><i class="fa fa-paper-plane-o"></i><span class="icon-name">fa-paper-plane-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-paw'; popoverVisible=false"><span><i class="fa fa-paw"></i><span class="icon-name">fa-paw</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-pie-chart'; popoverVisible=false"><span><i class="fa fa-pie-chart"></i><span class="icon-name">fa-pie-chart</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-power-off'; popoverVisible=false"><span><i class="fa fa-power-off"></i><span class="icon-name">fa-power-off</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-print'; popoverVisible=false"><span><i class="fa fa-print"></i><span class="icon-name">fa-print</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-puzzle-piece'; popoverVisible=false"><span><i class="fa fa-puzzle-piece"></i><span class="icon-name">fa-puzzle-piece</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-qrcode'; popoverVisible=false"><span><i class="fa fa-qrcode"></i><span class="icon-name">fa-qrcode</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="Font Awesome (3)" name="third">
                      <div class="page-component">
                        <section class="content">
                          <ul class="icon-list">
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-random'; popoverVisible=false"><span><i class="fa fa-random"></i><span class="icon-name">fa-random</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-recycle'; popoverVisible=false"><span><i class="fa fa-recycle"></i><span class="icon-name">fa-recycle</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-road'; popoverVisible=false"><span><i class="fa fa-road"></i><span class="icon-name">fa-road</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-server'; popoverVisible=false"><span><i class="fa fa-server"></i><span class="icon-name">fa-server</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-share-alt'; popoverVisible=false"><span><i class="fa fa-share-alt"></i><span class="icon-name">fa-share-alt</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-share-square'; popoverVisible=false"><span><i class="fa fa-share-square"></i><span class="icon-name">fa-share-square</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-shield'; popoverVisible=false"><span><i class="fa fa-shield"></i><span class="icon-name">fa-shield</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-shopping-bag'; popoverVisible=false"><span><i class="fa fa-shopping-bag"></i><span class="icon-name">fa-shopping-bag</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-shopping-cart'; popoverVisible=false"><span><i class="fa fa-shopping-cart"></i><span class="icon-name">fa-shopping-cart</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-sitemap'; popoverVisible=false"><span><i class="fa fa-sitemap"></i><span class="icon-name">fa-sitemap</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-sliders'; popoverVisible=false"><span><i class="fa fa-sliders"></i><span class="icon-name">fa-sliders</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-snowflake-o'; popoverVisible=false"><span><i class="fa fa-snowflake-o"></i><span class="icon-name">fa-snowflake-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-spinner'; popoverVisible=false"><span><i class="fa fa-spinner"></i><span class="icon-name">fa-spinner</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-star'; popoverVisible=false"><span><i class="fa fa-star"></i><span class="icon-name">fa-star</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-suitcase'; popoverVisible=false"><span><i class="fa fa-suitcase"></i><span class="icon-name">fa-suitcase</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-tag'; popoverVisible=false"><span><i class="fa fa-tag"></i><span class="icon-name">fa-tag</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-tags'; popoverVisible=false"><span><i class="fa fa-tags"></i><span class="icon-name">fa-tags</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-tasks'; popoverVisible=false"><span><i class="fa fa-tasks"></i><span class="icon-name">fa-tasks</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-television'; popoverVisible=false"><span><i class="fa fa-television"></i><span class="icon-name">fa-television</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-thermometer'; popoverVisible=false"><span><i class="fa fa-thermometer"></i><span class="icon-name">fa-thermometer</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-trademark'; popoverVisible=false"><span><i class="fa fa-trademark"></i><span class="icon-name">fa-trademark</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-trash'; popoverVisible=false"><span><i class="fa fa-trash"></i><span class="icon-name">fa-trash</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-tree'; popoverVisible=false"><span><i class="fa fa-tree"></i><span class="icon-name">fa-tree</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-trophy'; popoverVisible=false"><span><i class="fa fa-trophy"></i><span class="icon-name">fa-trophy</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-tty'; popoverVisible=false"><span><i class="fa fa-tty"></i><span class="icon-name">fa-tty</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-umbrella'; popoverVisible=false"><span><i class="fa fa-umbrella"></i><span class="icon-name">fa-umbrella</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-unlock'; popoverVisible=false"><span><i class="fa fa-unlock"></i><span class="icon-name">fa-unlock</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-user'; popoverVisible=false"><span><i class="fa fa-user"></i><span class="icon-name">fa-user</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-user-o'; popoverVisible=false"><span><i class="fa fa-user-o"></i><span class="icon-name">fa-user-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-user-circle'; popoverVisible=false"><span><i class="fa fa-user-circle"></i><span class="icon-name">fa-user-circle</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-user-circle-o'; popoverVisible=false"><span><i class="fa fa-user-circle-o"></i><span class="icon-name">fa-user-circle-o</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-users'; popoverVisible=false"><span><i class="fa fa-users"></i><span class="icon-name">fa-users</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-video-camera'; popoverVisible=false"><span><i class="fa fa-video-camera"></i><span class="icon-name">fa-video-camera</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-volume-up'; popoverVisible=false"><span><i class="fa fa-volume-up"></i><span class="icon-name">fa-volume-up</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-warning'; popoverVisible=false"><span><i class="fa fa-warning"></i><span class="icon-name">fa-warning</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-wheelchair'; popoverVisible=false"><span><i class="fa fa-wheelchair"></i><span class="icon-name">fa-wheelchair</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-etsy'; popoverVisible=false"><span><i class="fa fa-etsy"></i><span class="icon-name">fa-etsy</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-free-code-camp'; popoverVisible=false"><span><i class="fa fa-free-code-camp"></i><span class="icon-name">fa-free-code-camp</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-linode'; popoverVisible=false"><span><i class="fa fa-linode"></i><span class="icon-name">fa-linode</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-meetup'; popoverVisible=false"><span><i class="fa fa-meetup"></i><span class="icon-name">fa-meetup</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-quora'; popoverVisible=false"><span><i class="fa fa-quora"></i><span class="icon-name">fa-quora</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-ravelry'; popoverVisible=false"><span><i class="fa fa-ravelry"></i><span class="icon-name">fa-ravelry</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-superpowers'; popoverVisible=false"><span><i class="fa fa-superpowers"></i><span class="icon-name">fa-superpowers</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-mars'; popoverVisible=false"><span><i class="fa fa-mars"></i><span class="icon-name">fa-mars</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-venus'; popoverVisible=false"><span><i class="fa fa-venus"></i><span class="icon-name">fa-venus</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-google-wallet'; popoverVisible=false"><span><i class="fa fa-google-wallet"></i><span class="icon-name">fa-google-wallet</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-paypal'; popoverVisible=false"><span><i class="fa fa-paypal"></i><span class="icon-name">fa-paypal</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-credit-card'; popoverVisible=false"><span><i class="fa fa-credit-card"></i><span class="icon-name">fa-credit-card</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="el-icon" name="fourth">
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
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-amazon'; popoverVisible=false"><span><i class="fa fa-amazon"></i><span class="icon-name">fa-amazon</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-android'; popoverVisible=false"><span><i class="fa fa-android"></i><span class="icon-name">fa-android</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-angellist'; popoverVisible=false"><span><i class="fa fa-angellist"></i><span class="icon-name">fa-angellist</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-apple'; popoverVisible=false"><span><i class="fa fa-apple"></i><span class="icon-name">fa-apple</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-bitcoin'; popoverVisible=false"><span><i class="fa fa-bitcoin"></i><span class="icon-name">fa-bitcoin</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-dropbox'; popoverVisible=false"><span><i class="fa fa-dropbox"></i><span class="icon-name">fa-dropbox</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-forumbee'; popoverVisible=false"><span><i class="fa fa-forumbee"></i><span class="icon-name">fa-forumbee</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-facebook'; popoverVisible=false"><span><i class="fa fa-facebook"></i><span class="icon-name">fa-facebook</span></span></a></li>
                            <li><a href="javascript:void(0)" @click="saveBean.icon = 'fa fa-windows'; popoverVisible=false"><span><i class="fa fa-windows"></i><span class="icon-name">fa-windows</span></span></a></li>
                          </ul>
                        </section>
                      </div>
                    </el-tab-pane>

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
            text: '权限',
            dataIndex: 'permission'
          },
          {
            text: '排序',
            dataIndex: 'sort'
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
        this.$http.get(this.global.serverPath + 'menu/tree?permissionMenu=true')
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
          this.$http.delete(this.global.serverPath + 'menu/'+obj.id)
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

---
title: "Webフロントエンドでのリアクティビティからalien-signalsを知ろう"
description: "Webフロントエンドでのリアクティビティからalien-signalsを知ろう"
date: 2025-03-24
author: yamanoku
source: zenn.dev
noindex: true
---

近年のWebフロントエンド開発において「リアクティビティ」という概念が非常に重要になっています。今回は、このリアクティビティにまつわる歴史を辿りつつ、2025年の1月にv1.0となったリアクティビティライブラリである「alien-signals」についてを解説していきます。

## リアクティビティとは何を実現するものか

そもそも「リアクティビティ」とは何かについてを説明します。

リアクティビティを日本語にすると「**反応性**」と訳されることがあります。この「反応性」とは、ある状態の変化に対してシステムが適切な対応をすることを指します。

Webフロントエンドにおける「反応性」は、アプリケーションの状態（データ）が変化した際に、その変化を検知し、関連するUIや他の状態を自動的に更新する仕組みのことです。

<svg aria-roledescription="flowchart-v2" role="graphics-document document" viewBox="0 0 995.0859375 179.75" style="max-width: 995.0859375px;" class="flowchart" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100%" id="mermaid-1767159984466"><style>#mermaid-1767159984466{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1767159984466 .error-icon{fill:#552222;}#mermaid-1767159984466 .error-text{fill:#552222;stroke:#552222;}#mermaid-1767159984466 .edge-thickness-normal{stroke-width:1px;}#mermaid-1767159984466 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1767159984466 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1767159984466 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-1767159984466 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1767159984466 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1767159984466 .marker{fill:#333333;stroke:#333333;}#mermaid-1767159984466 .marker.cross{stroke:#333333;}#mermaid-1767159984466 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1767159984466 p{margin:0;}#mermaid-1767159984466 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1767159984466 .cluster-label text{fill:#333;}#mermaid-1767159984466 .cluster-label span{color:#333;}#mermaid-1767159984466 .cluster-label span p{background-color:transparent;}#mermaid-1767159984466 .label text,#mermaid-1767159984466 span{fill:#333;color:#333;}#mermaid-1767159984466 .node rect,#mermaid-1767159984466 .node circle,#mermaid-1767159984466 .node ellipse,#mermaid-1767159984466 .node polygon,#mermaid-1767159984466 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1767159984466 .rough-node .label text,#mermaid-1767159984466 .node .label text{text-anchor:middle;}#mermaid-1767159984466 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-1767159984466 .node .label{text-align:center;}#mermaid-1767159984466 .node.clickable{cursor:pointer;}#mermaid-1767159984466 .arrowheadPath{fill:#333333;}#mermaid-1767159984466 .edgePath .path{stroke:#333333;stroke-width:2.0px;}#mermaid-1767159984466 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1767159984466 .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#mermaid-1767159984466 .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#mermaid-1767159984466 .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#mermaid-1767159984466 .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#mermaid-1767159984466 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1767159984466 .cluster text{fill:#333;}#mermaid-1767159984466 .cluster span{color:#333;}#mermaid-1767159984466 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1767159984466 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#mermaid-1767159984466 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984466_flowchart-v2-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984466_flowchart-v2-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984466_flowchart-v2-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984466_flowchart-v2-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-1767159984466_flowchart-v2-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-1767159984466_flowchart-v2-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"><g data-look="classic" id="リアクティビティシステム" class="cluster"><rect height="163.75" width="754.5703125" y="8" x="8" style=""></rect><g transform="translate(290.8828125, 8)" class="cluster-label"><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">リアクティビティシステム</tspan></tspan></text></g></g></g></g><g class="edgePaths"><path marker-end="url(#mermaid-1767159984466_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_Input_State_0" d="M125,85.613L137.5,82.552C150,79.492,175,73.371,193.75,70.31C212.5,67.25,225,67.25,236.833,67.25C248.667,67.25,259.833,67.25,265.417,67.25L271,67.25"></path><path marker-end="url(#mermaid-1767159984466_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_State_View_1" d="M479.57,67.25L489.404,67.25C499.237,67.25,518.904,67.25,533.654,67.25C548.404,67.25,558.237,67.25,567.404,67.25C576.57,67.25,585.07,67.25,589.32,67.25L593.57,67.25"></path><path marker-end="url(#mermaid-1767159984466_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_View_User_2" d="M737.57,67.25L741.737,67.25C745.904,67.25,754.237,67.25,766.806,67.25C779.375,67.25,796.18,67.25,808.783,68.359C821.387,69.467,829.789,71.685,837.547,73.732C845.305,75.779,852.418,77.657,855.974,78.595L859.531,79.534"></path><path marker-end="url(#mermaid-1767159984466_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_User_Input_3" d="M863.398,113.196L854.996,115.413C846.594,117.63,829.789,122.065,812.984,124.283C796.18,126.5,779.375,126.5,755.139,126.5C730.904,126.5,699.237,126.5,661.904,126.5C624.57,126.5,581.57,126.5,533.189,126.5C484.809,126.5,431.047,126.5,374.618,126.5C318.19,126.5,259.095,126.5,223.298,124.97C187.5,123.44,175,120.379,163.148,117.477C151.295,114.575,140.09,111.832,134.488,110.46L128.885,109.089"></path></g><g class="edgeLabels"><g transform="translate(200, 67.25)" class="edgeLabel"><g transform="translate(-50, -11.25)" class="label"><g><rect height="22.5" width="100" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">イベント発生</tspan></tspan></text></g></g></g><g transform="translate(538.5703125, 67.25)" class="edgeLabel"><g transform="translate(-34, -11.25)" class="label"><g><rect height="22.5" width="68" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">状態変更</tspan></tspan></text></g></g></g><g transform="translate(812.984375, 67.25)" class="edgeLabel"><g transform="translate(-25.4140625, -11.25)" class="label"><g><rect height="22.5" width="50.828125" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">UI更新</tspan></tspan></text></g></g></g><g transform="translate(538.5703125, 126.5)" class="edgeLabel"><g transform="translate(-18, -11.25)" class="label"><g><rect height="22.5" width="36" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">操作</tspan></tspan></text></g></g></g></g><g class="nodes"><g transform="translate(79, 96.875)" id="flowchart-Input-0" class="node default"><rect height="48.5" width="92" y="-24.25" x="-46" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">入力</tspan></tspan></text></g></g></g><g transform="translate(377.28515625, 67.25)" id="flowchart-State-1" class="node default"><rect height="48.5" width="204.5703125" y="-24.25" x="-102.28515625" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">状態</tspan><tspan font-weight="normal" class="text-inner-tspan" font-style="normal"> (データストア)</tspan></tspan></text></g></g></g><g transform="translate(667.5703125, 67.25)" id="flowchart-View-2" class="node default"><rect height="48.5" width="140" y="-24.25" x="-70" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">表示・変更</tspan></tspan></text></g></g></g><g transform="translate(925.2421875, 96.875)" id="flowchart-User-8" class="node default"><rect height="48.5" width="123.6875" y="-24.25" x="-61.84375" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">ユーザー</tspan></tspan></text></g></g></g></g></g></g></svg>

分かりやすい例としてあげられるのがスプレッドシートのようなUIです。あるセルの値が変更されると、そのセルの値を参照している他のセルも自動的に再計算され表示が更新されます。

<figure>
<img src="https://i.gyazo.com/9e5516838ab5e79b83253f2d8050eb1b.png" alt="列A、B、Cと行0、1、2を持つスプレッドシート表。セルA0には1、セルA1には2、セルA2には3が入っています。その他のセルは空白です。">
<figcaption>スプレッドシートのサンプル</figcaption>
</figure>

<figure>
<img src="https://i.gyazo.com/c3eb032dd0bf7c8f7bedb7bd8b6a840a.png" alt="列A、B、Cと行0、1、2を持つスプレッドシート表。セルA0には1、セルA1には2、セルA2には数式「= A0 + A1」が表示されています。その他のセルは空白です。">
<figcaption>セルA2には数式が挿入されている</figcaption>
</figure>

<figure>
<img src="https://i.gyazo.com/8a47000044a9f513c87fc5f8b9df9ef4.png" alt="列A、B、Cと行0、1、2を持つスプレッドシート表。セルA0には1、セルA1には3、セルA2には4が入っています。その他のセルは空白です。">
<figcaption>セルの値が変更されるとそれを参照するセルも変更される</figcaption>
</figure>

MVCアプリケーションで、モデルの変更を監視しているビューが自動的に更新される仕組みも同様のものと言えます。

### リアクティブプログラミングについて

このリアクティビティについての源泉を知るために、リアクティブプログラミングについても触れておきましょう。

リアクティブプログラミングは非同期でのデータの流れ（ストリーム）を扱うプログラミングスタイルです。一般には「Publish-Subscribe（通称Pub-Sub）」モデルを採用してデータストリームを扱っています。これはGoFのオブザーバーパターン[^1]に代わるものとされています。

[^1]: [Observer](https://refactoring.guru/design-patterns/observer)

<svg aria-roledescription="flowchart-v2" role="graphics-document document" viewBox="0 -2 681.171875 81" style="max-width: 681.171875px;" class="flowchart" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100%" id="mermaid-1767159984296"><style>#mermaid-1767159984296{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1767159984296 .error-icon{fill:#552222;}#mermaid-1767159984296 .error-text{fill:#552222;stroke:#552222;}#mermaid-1767159984296 .edge-thickness-normal{stroke-width:1px;}#mermaid-1767159984296 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1767159984296 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1767159984296 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-1767159984296 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1767159984296 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1767159984296 .marker{fill:#333333;stroke:#333333;}#mermaid-1767159984296 .marker.cross{stroke:#333333;}#mermaid-1767159984296 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1767159984296 p{margin:0;}#mermaid-1767159984296 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1767159984296 .cluster-label text{fill:#333;}#mermaid-1767159984296 .cluster-label span{color:#333;}#mermaid-1767159984296 .cluster-label span p{background-color:transparent;}#mermaid-1767159984296 .label text,#mermaid-1767159984296 span{fill:#333;color:#333;}#mermaid-1767159984296 .node rect,#mermaid-1767159984296 .node circle,#mermaid-1767159984296 .node ellipse,#mermaid-1767159984296 .node polygon,#mermaid-1767159984296 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1767159984296 .rough-node .label text,#mermaid-1767159984296 .node .label text{text-anchor:middle;}#mermaid-1767159984296 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-1767159984296 .node .label{text-align:center;}#mermaid-1767159984296 .node.clickable{cursor:pointer;}#mermaid-1767159984296 .arrowheadPath{fill:#333333;}#mermaid-1767159984296 .edgePath .path{stroke:#333333;stroke-width:2.0px;}#mermaid-1767159984296 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1767159984296 .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#mermaid-1767159984296 .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#mermaid-1767159984296 .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#mermaid-1767159984296 .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#mermaid-1767159984296 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1767159984296 .cluster text{fill:#333;}#mermaid-1767159984296 .cluster span{color:#333;}#mermaid-1767159984296 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1767159984296 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#mermaid-1767159984296 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984296_flowchart-v2-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984296_flowchart-v2-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984296_flowchart-v2-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-1767159984296_flowchart-v2-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-1767159984296_flowchart-v2-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-1767159984296_flowchart-v2-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"></g><g class="edgePaths"><path marker-end="url(#mermaid-1767159984296_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_P_B_0" d="M134.305,40.5L141.471,40.5C148.638,40.5,162.971,40.5,173.721,40.5C184.471,40.5,191.638,40.5,198.138,40.5C204.638,40.5,210.471,40.5,213.388,40.5L216.305,40.5"></path><path marker-end="url(#mermaid-1767159984296_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_S_1" d="M372.5,30.336L386.333,28.488C400.167,26.641,427.833,22.945,448.583,22.075C469.333,21.205,483.167,23.161,496.34,25.023C509.513,26.885,522.026,28.653,528.283,29.538L534.539,30.422"></path><path marker-end="url(#mermaid-1767159984296_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-dotted edge-thickness-normal edge-pattern-solid flowchart-link" id="L_S_B_2" d="M538.5,50.018L524.667,51.973C510.833,53.929,483.167,57.839,462.417,58.871C441.667,59.902,427.833,58.055,414.661,56.295C401.488,54.536,388.977,52.865,382.721,52.029L376.465,51.194"></path></g><g class="edgeLabels"><g transform="translate(177.3046875, 40.5)" class="edgeLabel"><g transform="translate(-18, -11.25)" class="label"><g><rect height="22.5" width="36" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">発行</tspan></tspan></text></g></g></g><g transform="translate(455.5, 19.25)" class="edgeLabel"><g transform="translate(-18, -11.25)" class="label"><g><rect height="22.5" width="36" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">通知</tspan></tspan></text></g></g></g><g transform="translate(455.5, 61.75)" class="edgeLabel"><g transform="translate(-58, -11.25)" class="label"><g><rect height="22.5" width="116" y="-2" x="-2" style="" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">トピックを購読</tspan></tspan></text></g></g></g></g><g class="nodes"><g transform="translate(71.15234375, 40.5)" id="flowchart-P-0" class="node default"><rect height="48.5" width="126.3046875" y="-24.25" x="-63.15234375" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">Publisher</tspan></tspan></text></g></g></g><g transform="translate(296.40234375, 40.5)" id="flowchart-B-1" class="node default"><rect height="48.5" width="152.1953125" y="-24.25" x="-76.09765625" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">Event</tspan><tspan font-weight="normal" class="text-inner-tspan" font-style="normal"> Broker</tspan></tspan></text></g></g></g><g transform="translate(605.8359375, 40.5)" id="flowchart-S-2" class="node default"><rect height="48.5" width="134.671875" y="-24.25" x="-67.3359375" data-et="node" data-id="abc" style="" class="basic label-container"></rect><g transform="translate(0, -9.25)" style="" class="label"><rect></rect><g><rect style="stroke: none" class="background"></rect><text style="" y="-10.1"><tspan dy="1.1em" y="-0.1em" x="0" class="text-outer-tspan"><tspan font-weight="normal" class="text-inner-tspan" font-style="normal">Subscriber</tspan></tspan></text></g></g></g></g></g></g></svg>

リアクティブプログラミングが有用な例として、とあるデータの更新が終わった際に特定のUIを更新したり、とあるユーザーが通知を実施した際に他のユーザー全員に通知を届けたい場合が挙げられます。

Webフロントエンドにおけるリアクティブプログラミングの歴史において、Knockout observablesやMeteor Tracker、RxJSのようなライブラリが基礎を築いていました。状態管理ライブラリであるMobX[^2]やXStateも、背後では同様の原理に基づいてオブジェクトのプロパティの変化を監視し、関連する部分を更新していました。

[^2]: [The fundamental principles behind MobX | HackerNoon](https://hackernoon.com/the-fundamental-principles-behind-mobx-7a725f71f3e8)

これらの先駆的な技術を背景に、現代の主要なフロントエンドフレームワークは、より洗練されたリアクティビティの仕組みをコア機能として取り込むようになりました。

- Emberは、依存関係を自動的に追跡する `Autotracking` というリアクティビティシステム[^3]を採用している
- Vue 2では、当初は `getter`/`setter` を使用していました[^4]が、Vue 3からは `Proxy` オブジェクトを活用した、より柔軟で高性能なリアクティビティシステムを提供している[^5]
- SvelteやSolidでは仮想DOMを活用せずにコンパイラを用いてコードを変換し、変数への代入操作が直接DOMの更新を引き起こすリアクティビティモデルを実現している

[^3]: [Autotracking In-Depth - In-Depth Topics - Ember Guides](https://guides.emberjs.com/release/in-depth-topics/autotracking-in-depth/)

[^4]: https://v2.vuejs.org/v2/guide/reactivity

[^5]: https://vuejs.org/guide/extras/reactivity-in-depth.html

## Push型、Pull型、Push-Pull型

リアクティブプログラミングにおいては、状態の変化を依存している部分にどのように伝えるかによって、主にPush型、Pull型、Push-Pull型に分類できます。次にそれぞれの特徴を見ていきます。

### Push型

* このモデルでは、状態が変更されると、その状態に依存しているすべてのシステム(コンポーネントなど)に**自動的に変更を通知（push）** し、**通知を受け取ったシステムは再計算が実行される**
* RxJSがこのPush型のモデルを採用しており、状態の変更をストリームとして扱うことができる
* 初期のリアクティブプログラミングではこのPush型のモデルが一般的だったが、不要な再計算やUIの早期更新の問題が指摘されていた

### Pull型

* Pull型のモデルでは、状態が変更されても、依存している側は直ちに通知を受けない
* 代わりに、**依存している側が必要になったタイミング** (例えば、UIのレンダリング時や値が実際に要求された時) に、**最新の値を状態から「引き出す (pull)」** 必要がある
* これにより、状態が頻繁に変化する場合でも、実際に必要になるまで計算を遅延させることができてパフォーマンスの最適化に繋がる
* 仮想DOMを採用したライブラリ・フレームワークや、ElmでもPull型のアルゴリズムが採用されている

### Push-Pull型

* Push-Pull型のモデルは、**Push型とPull型の利点を組み合わせたハイブリッドなアプローチ**
* 状態が変更されると、依存している部分に対して「dirty（ダーティ）」であるというフラグを立てるなどの軽い通知 (Push) を行う
* その後、実際にその依存している部分の値が必要となった際に最新の値を計算する (Pull) という流れを取り込む

近年ではPull型やPush-Pull型のアプローチが、パフォーマンスと効率性の観点から多くのリアクティブプログラミングで採用される傾向にあります。これにより、不要な計算を避け、必要な時だけ最新の状態を反映させることが可能になり、よりスムーズなアプリケーション体験を提供できます。

## Signalsというインターフェイス

リアクティブプログラミングにおいて近年注目を集めているのが、**「Signals（シグナル）」** というインターフェイスです。Signalsの基本的な機能は以下のとおりです。

* **値の保持 (State/Writable Signal)**
* **値へのアクセス (Getter)**
* **値の更新 (Setter)**
* **算出された値 (Computed/Derived Signals)**
* **作用・監視 (Effects/Watchers)**

それぞれのAPIは異なりますが、[Solid](https://www.solidjs.com/docs/latest/api#createsignal)をはじめ、[Angular](https://angular.dev/guide/signals)、[Preact](https://preactjs.com/guide/v10/signals/)、[Qwik](https://qwik.dev/docs/components/state/#usesignal)、[Svelte 5からのリアクティビティ（Runes）](https://svelte.dev/blog/runes)など、多くのモダンなフレームワークがSignalsを採用しています。

Vue.jsでのComposition APIである [`ref`](https://vuejs.org/api/reactivity-core.html#ref) も、Signalsと似た概念として設計されています。PreactとQwikでは [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) と似たような形で設計されております（`.value` プロパティでアクセス、値を通じて作用している部分）。SolidとAngularは異なるAPIを提供していますが、いずれも `shallowRef` を活用して再現できます。詳しくは[API 設計のトレードオフ](https://vuejs.org/guide/extras/reactivity-in-depth#api-design-trade-offs)の章をご参照してください。

## alien-signalsとは？

<img src="https://github.com/stackblitz/alien-signals/raw/master/assets/logo.png" alt="alien-signalsのロゴ" width="300">

このようなSignalsの潮流の中で登場したのが **alien-signals** です。alien-signalsは、**非常に軽量なリアクティブライブラリ**であることを特徴としています。

https://github.com/stackblitz/alien-signals

このライブラリが生まれた背景として、作者であるJohnson氏が[Vue 3.4のリアクティビティシステムの最適化](https://github.com/vuejs/core/pull/5912)に関わったことが挙げられます。その後、[Vue 3.5がPreactに似たPull型のアルゴリズムに切り替わった](https://github.com/vuejs/core/pull/10397)ことを受け、Vue.jsとは別のリアクティビティライブラリを研究しはじめたことが、alien-signalsの開発のきっかけとなりました。

このライブラリではPush-Pull型を採用しています。さらに[Vue 3.6からはalien-signalsの実装がリアクティブプログラミングの基盤として取り入れられる](https://github.com/vuejs/core/pull/12349)ことになりました。

### alien-signalsの特徴

値を保持する `signal`、算出された値として計算する `computed`、リアクティブな処理を定義する `effect`、そして `effect` の有効範囲を管理する `effectScope` など、Signalsの基本的なAPIを提供しています。

```javascript
import { signal, computed, effect } from 'alien-signals';

const count = signal(1);
const doubleCount = computed(() => count() * 2);

effect(() => {
  console.log(`Count is: ${count()}`);
}); // Console: Count is: 1

console.log(doubleCount()); // 2

count(2); // Console: Count is: 2

console.log(doubleCount()); // 4
```

`signal` でリアクティブな値 `count` を作成し、`effect` 内でその値を監視しています。`count` の値が変更されると、`effect` 内の処理が自動的に再実行されます。

```javascript
import { signal, effect, effectScope } from 'alien-signals';

const count = signal(1);

const stopScope = effectScope(() => {
  effect(() => {
    console.log(`Count in scope: ${count()}`);
  }); // Console: Count in scope: 1
});

count(2); // Console: Count in scope: 2

stopScope();

count(3); // No console output
```

`effectScope` を使うことで、`effect` のライフサイクルを管理できます。

内部の処理では、`propagate` 関数による変更の伝播、`checkDirty` 関数によるダーティチェックなど、再帰呼び出しを避けるための最適化が施されており、効率的な更新を実現しています。

また、`createReactiveSystem()` を使うことで、alien-signalsのコアアルゴリズムを再利用して、独自のSignals APIの構築も可能です。

```javascript
const system = createReactiveSystem({
  updateComputed(computed: Computed) {
    return computed.update();
  },
  notifyEffect(watcher: subtle.Watcher) {
    if (watcher.flags & alien.SubscriberFlags.Dirty) {
      watcher.run();
      return true;
    }
    return false;
  },
});
```

### 派生プロジェクト

alien-signalsは、現在さまざまなフレームワークや言語で派生して実装が進められています。2025年3月時点での派生プロジェクトは以下の通りです。

- [YanqingXu/alien-signals-in-lua](https://github.com/YanqingXu/alien-signals-in-lua)
- [medz/alien-signals-dart](https://github.com/medz/alien-signals-dart)
- [delaneyj/alien-signals-go](https://github.com/delaneyj/alien-signals-go)
- [Rajaniraiyn/react-alien-signals](https://github.com/Rajaniraiyn/react-alien-signals)
- [hunghg255/reactjs-signal](https://github.com/hunghg255/reactjs-signal)
- [CCherry07/alien-deepsignals](https://github.com/CCherry07/alien-deepsignals)
- [gn8-ai/universe-alien-signals](https://github.com/gn8-ai/universe-alien-signals)

## TC39への標準化提案

Signalsは、現在Ecma Internationalの技術委員会39（通称TC39）にてECMAScriptでの標準化提案が進められています。現在はStage 1（Proposal）になります。

https://github.com/tc39/proposal-signals

Signalsの仕様提案の推進者には、BloombergのDaniel Ehrenberg氏、Emberの開発者であるYehuda Katz氏、Google社内で使用されるWizフレームワークのメンテナのJatin Ramanathan氏、SvelteメンテナのDominic Gannaway氏などが名を連ねています。

alien-signalsのようなライブラリや各フレームワークによるSignalsの実装がより浸透していくと、この標準化の動きをさらに加速させる可能性があります。将来的には、JavaScriptの標準APIとしてSignalsが利用できるようになれば、アプリケーション側はSignalsを採用するために変更を加える必要はなくなります。また、複数のマイクロフロントエンドで共通のデータ層を共有する場合などに役立つとされています。

## まとめ

- リアクティブは、現代のフロントエンドフレームワークにおける重要な概念であり、状態の変化に応じてUIを効率的に更新するための基盤となる
- 複数の主要なフレームワークが、それぞれ独自の方法でリアクティビティを実現しているが、近年「Signals」というパターンに収束する傾向が見られる
- alien-signalsは、軽量なリアクティブプログラミングのライブラリであり、Vue 3.6から採用されることになった
- TC39におけるSignalsの標準化の動きは、JavaScriptエコシステム全体に大きな影響を与える可能性があり、フレームワーク間の相互運用性や開発の共通理解を促進することが期待される

## 宣伝: Vue.js v-tokyo Meetup #22

Vue.js日本ユーザーグループが主催する「Vue.js v-tokyo Meetup #22」では、alien-signalsのメジャーリリースを記念して、Webフロントエンドフレームワークのリアクティビィティについてキャッチアップできるイベントが3/28に開催されます。

[Vue.js v-tokyo Meetup #22 - connpass](https://vuejs-meetup.connpass.com/event/343338/)

alien-signalsやVue.jsについてはもちろん、PreactやAngular、Svelteなどのフレームワークにおけるリアクティブについても学ぶことができる貴重な機会です。ぜひご参加ください！

## 謝辞

本記事は、NotebookLM Plusにより関連情報の要約・整理をしてもらい作成されました。本記事のレビューについては[ubugeeei](https://github.com/ubugeeei)さん、[ナイトウ](https://github.com/engineer-naito/)さん、[GANGAN](https://github.com/shinGangan)さんよりしていただけました。感謝申し上げます。

## 参考情報

* [Reactive programming - Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming)
* [The Reactive Manifesto](https://www.reactivemanifesto.org/)
* [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
* [pzuraq | blog | What Is Reactivity?](https://www.pzuraq.com/blog/what-is-reactivity)
* [pzuraq | blog | What Makes a Good Reactive System?](https://www.pzuraq.com/blog/what-makes-a-good-reactive-system#observables-streams-and-rxjs)
* [EmberConf 2024 - Standardizing Autotracking Via TC39 Signals with Daniel Ehrenberg](https://youtu.be/ji7zSHCX6d8?list=TLGGE0qWPG3HOW4xNTAzMjAyNQ)
* [The Evolution of Signals in JavaScript - DEV Community](https://dev.to/this-is-learning/the-evolution-of-signals-in-javascript-8ob)
* [ついにやってくるSignals！Angularはどう変わるのか？【ng-japan OnAir #63】 - YouTube](https://www.youtube.com/watch?v=gCKw5OyRPiA)

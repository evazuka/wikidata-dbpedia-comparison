(this["webpackJsonpfamily-tree"]=this["webpackJsonpfamily-tree"]||[]).push([[0],{105:function(e,t,a){e.exports=a(119)},111:function(e,t,a){},117:function(e,t,a){},118:function(e,t,a){},119:function(e,t,a){"use strict";a.r(t);var n,r=a(46),i=a.n(r),l=a(0),u=a.n(l),o=a(19),s=a(15),c=a(1),d=a.n(c),p=a(4),h=a(2),m=a(6),b=a(22),v=a(9),y=a(8),f=(a(111),function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).handleTypeChange=function(e){n.setState({comparisonType:e.target.value})},n.getCurrentUrl=function(){switch(n.state.comparisonType){case"tree":return"tree-comparison";case"filmography":return"filmography-comparison";default:throw Error("Wrong comparison type")}},n.state={value:"",error:null,comparisonType:"tree"},n.handleChange=n.handleChange.bind(Object(b.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(b.a)(n)),n}return Object(m.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value,error:null})}},{key:"handleSubmit",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t,a,n,r,i,l,u,o,s,c,p,h;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(l=null===(t=this.state.value.split("wiki/"))||void 0===t||null===(a=t[1])||void 0===a||null===(n=a.split("?"))||void 0===n||null===(r=n[0])||void 0===r||null===(i=r.split("/"))||void 0===i?void 0:i[0])){e.next=3;break}return e.abrupt("return",this.setState({error:"Wrong URL entered! Try https://en.wikipedia.org/wiki/Elizabeth_II"}));case 3:return u=decodeURI(l),"https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=",e.prev=5,e.next=8,fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&titles="+u);case 8:return o=e.sent,e.next=11,o.json();case 11:if(s=e.sent,c=s.query.pages,"-1"!==(p=Object.keys(c)[0])){e.next=16;break}return e.abrupt("return",this.setState({error:"There's no data about this item in knowledge bases"}));case 16:return h=c[p].pageprops.wikibase_item,e.abrupt("return",this.props.history.push("/".concat(this.getCurrentUrl(),"/").concat(h,"/").concat(u)));case 20:return e.prev=20,e.t0=e.catch(5),e.abrupt("return",this.setState({error:"Error happend while retrieval of this item"}));case 23:case"end":return e.stop()}}),e,this,[[5,20]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"container"},u.a.createElement("h2",null,"The comparison of Wikidata and DBpedia knowledge bases")," ",u.a.createElement("br",null),u.a.createElement("p",null,"Enter the link to the person's page on Wikipedia to build a family tree of his descendants or check his filmography")," ",u.a.createElement("br",null),u.a.createElement("div",null,u.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange,onKeyDown:function(t){if(13===t.keyCode)return e.handleSubmit()},style:{width:"500px"}}),u.a.createElement("button",{onClick:this.handleSubmit},"View")),void 0!==this.state.error?u.a.createElement("p",{className:"error"},this.state.error):null,u.a.createElement("div",{className:"checkbox-group"},u.a.createElement("label",null,u.a.createElement("input",{type:"radio",name:"comparison-type",value:"tree",checked:"tree"===this.state.comparisonType,onChange:this.handleTypeChange}),"Compare family trees"),u.a.createElement("label",null,u.a.createElement("input",{type:"radio",name:"comparison-type",value:"filmography",checked:"filmography"===this.state.comparisonType,onChange:this.handleTypeChange}),"Compare filmography")),u.a.createElement("p",{style:{marginBottom:0}},"Or try this examples:"),u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement(o.b,{to:"/".concat(this.getCurrentUrl(),"/Q318263/Michael_Redgrave")},"Michael Redgrave")," (https://en.wikipedia.org/wiki/Michael_Redgrave)"),u.a.createElement("li",null,u.a.createElement(o.b,{to:"/".concat(this.getCurrentUrl(),"/Q882/Charlie_Chaplin")},"Charlie Chaplin")," (https://en.wikipedia.org/wiki/Charlie_Chaplin)"),u.a.createElement("li",null,u.a.createElement(o.b,{to:"/".concat(this.getCurrentUrl(),"/Q9960/Ronald_Reagan")},"Ronald Reagan")," (https://en.wikipedia.org/wiki/Ronald_Reagan)")))}}]),a}(u.a.Component)),w=a(13),E=(a(45),a(117),a(5)),g=a(20),O=function(){function e(t){Object(h.a)(this,e),this.endpoint=void 0,this.endpoint=t}return Object(m.a)(e,[{key:"query",value:function(e){var t=this.endpoint+"?query="+encodeURIComponent(e)+"&format=json";return fetch(t,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()}))}}]),e}(),k=function(e){return e.map((function(e){return{id:e.person.value,name:e.personLabel.value,birth:e.birth.value,death:e.death.value,picture:e.pic.value,parent:""}}))},I=function e(){var t=this;Object(h.a)(this,e),this.endpointUrl="https://query.wikidata.org/sparql",this.rootSparqlQuery=function(e){return"SELECT DISTINCT ?person ?personLabel ?birth ?death ?pic WHERE {\n        BIND (wd:".concat(e,' as ?person) .\n        OPTIONAL {?person wdt:P18 ?picture . }\n        OPTIONAL {?person wdt:P569 ?dob . }\n        OPTIONAL {?person wdt:P570 ?dod . }\n        BIND(YEAR(?dob) as ?yob) .\n        BIND(YEAR(?dod) as ?yod) .\n        BIND(COALESCE(?picture, "") as ?pic) .\n        BIND(COALESCE(?yob, "") as ?birth) .\n        BIND(COALESCE(?yod, "") as ?death) .\n              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n        } LIMIT 1')},this.sparqlQuery=function(e){return"SELECT ?descendant ?descendantLabel (SAMPLE(?person) AS ?personId) (SAMPLE(?birth) AS ?birthYear) (SAMPLE(?death) AS ?deathYear) (SAMPLE(?pic) AS ?image) WHERE {\n        wd:".concat(e,' wdt:P40* ?person .\n        ?person wdt:P40 ?descendant .\n        OPTIONAL { ?descendant wdt:P18 ?picture . }\n        OPTIONAL {?descendant wdt:P569 ?dob . }\n        OPTIONAL {?descendant wdt:P570 ?dod . }\n        BIND(YEAR(?dob) as ?yob) .\n        BIND(YEAR(?dod) as ?yod) .\n        BIND(COALESCE(?picture, "") as ?pic) .\n        BIND(COALESCE(?yob, "") as ?birth) .\n        BIND(COALESCE(?yod, "") as ?death) .\n              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n        } GROUP BY ?descendant ?descendantLabel')},this.queryDispatcher=new O(this.endpointUrl),this.query=function(){var e=Object(p.a)(d.a.mark((function e(a){var n,r,i,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.queryDispatcher.query(t.sparqlQuery(a));case 2:return n=e.sent,e.next=5,t.queryDispatcher.query(t.rootSparqlQuery(a));case 5:return r=e.sent,u=n.results.bindings,i=u.map((function(e){return{id:e.descendant.value,name:e.descendantLabel.value,birth:e.birthYear.value,death:e.deathYear.value,picture:e.image.value,parent:e.personId.value}})),l=k(r.results.bindings),e.abrupt("return",[].concat(Object(g.a)(i),Object(g.a)(l)));case 9:case"end":return e.stop()}var u}),e)})));return function(t){return e.apply(this,arguments)}}()},D=a(49),T=a(18),C=function(e){var t=T.d().id((function(e){return e.id})).parentId((function(e){return e.parent}))(e),a=800/(t.height+1);return[T.e().nodeSize([50,150])(t),10,a]},S=function(e){var t="";return""!==e.data.birth&&(t+="b. ".concat(e.data.birth)),""!==e.data.death&&(e.data.birth&&(t+=" - "),t+="d. ".concat(e.data.death)),t},j=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).ref=void 0,e.renderD3=function(){var t=C(e.props.data),a=Object(D.a)(t,3),n=a[0],r=a[1],i=a[2],l=1/0,u=-l;n.each((function(e){e.x>u&&(u=e.x),e.x<l&&(l=e.x)}));var o=Math.random(),s=T.c(e.ref),c=s.append("g").attr("font-family","sans-serif").attr("font-size",10).attr("transform","translate(".concat(i/3,",").concat(r-l,")")),d=(c.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5).selectAll("path").data(n.links()).join("path").attr("d",T.b().x((function(e){return e.y})).y((function(e){return e.x}))),c.append("g").attr("stroke-linejoin","round").attr("stroke-width",3).selectAll("g").data(n.descendants()).join("g").attr("transform",(function(e){return"translate(".concat(e.y,",").concat(e.x,")")})));s.append("defs").append("clipPath").attr("id","circleClip"+o).append("circle").attr("r",20),d.append("circle").attr("r",20).attr("fill","grey"),d.append("svg:image").attr("xlink:href",(function(e){return e.data.picture})).attr("clip-path","url(#circleClip"+o+")").attr("x",-20).attr("y",-20).attr("height",40).attr("width",40).attr("preserveAspectRatio","xMidYMid slice"),d.append("text").attr("dy","0.31em").attr("x",(function(e){return e.children?-22:22})).attr("text-anchor",(function(e){return e.children?"end":"start"})).text((function(e){return e.data.name})).clone(!0).lower().attr("stroke","white"),d.append("text").attr("dy","1.3em").attr("x",(function(e){return e.children?-22:22})).attr("text-anchor",(function(e){return e.children?"end":"start"})).text(S).clone(!0).lower().attr("stroke","white"),s.attr("viewBox",[0,0,800,u-l+2*r]).call(T.f().extent([[0,0],[800,u-l+2*r]]).scaleExtent([1,8]).on("zoom",(function(){c.attr("transform",T.a.transform)})))},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.renderD3()}},{key:"render",value:function(){var e=this;return u.a.createElement("svg",{className:"container",ref:function(t){return e.ref=t},width:800,height:window.innerHeight})}}]),a}(u.a.Component);!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Finished=2]="Finished",e[e.Failed=3]="Failed"}(n||(n={}));var x=function(e){var t=e.overview;return u.a.createElement(u.a.Fragment,null,u.a.createElement("p",null,u.a.createElement("strong",null,"Status:")," ",n[t.status]),null!==t.time?u.a.createElement("p",null,u.a.createElement("strong",null,"Time:")," ",t.time," ms"):null,null!==t.nodeCount?u.a.createElement("p",null,u.a.createElement("strong",null,"Node count:")," ",t.nodeCount):null,null!==t.error?u.a.createElement("p",null,u.a.createElement("strong",null,"Error:")," ",t.error):null)},A=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.wikidataQueryOverview,a=e.dbpediaQueryOverview;return u.a.createElement("div",null,u.a.createElement("h3",null,"Wikidata Query Overview"),u.a.createElement(x,{overview:t}),u.a.createElement("hr",null),u.a.createElement("h3",null,"DBpedia Query Overview"),u.a.createElement(x,{overview:a}))}}]),a}(u.a.Component),N=function(e){return e.map((function(e){return{id:e.person.value,name:e.label.value,birth:e.yob.value,death:e.yod.value,picture:e.pic.value,parent:""}}))},Q=function e(){var t=this;Object(h.a)(this,e),this.endpointUrl="https://dbpedia.org/sparql",this.rootSparqlQuery=function(e){return"PREFIX dbo: <http://dbpedia.org/ontology/> \n    SELECT DISTINCT ?person ?pic ?label ?yob ?yod \n    WHERE {\n         BIND(<".concat(e,'> as ?person)\n         ?person rdfs:label ?label .\n         OPTIONAL { ?person  dbo:birthDate ?dob} \n         OPTIONAL { ?person  dbo:deathDate ?dod}\n         OPTIONAL { ?person dbo:thumbnail ?thumbnail} \n         BIND(IF(bound(?dob),\n         YEAR(xsd:dateTime(?dob)),\n         "") as ?yob)\n         BIND(IF(bound(?dod),\n         YEAR(xsd:dateTime(?dod)),\n         "") as ?yod)\n         BIND(COALESCE(?thumbnail, "") as ?pic) .\n              FILTER (lang(?label) = \'en\')\n    } LIMIT 1')},this.sparqlQuery=function(e){return"PREFIX dbo: <http://dbpedia.org/ontology/> \n    SELECT DISTINCT ?person ?pic ?label ?yob ?yod ?descendant\n    WHERE {\n         ?person dbo:parent* <".concat(e,'> \n         OPTIONAL { ?descendant dbo:parent ?person }\n         BIND(?person as ?person)\n         OPTIONAL { ?descendant rdfs:label ?label }\n         OPTIONAL { ?descendant  dbo:birthDate ?dob} \n         OPTIONAL { ?descendant  dbo:deathDate ?dod}\n         OPTIONAL { ?descendant dbo:thumbnail ?thumbnail} \n         BIND(IF(bound(?dob),\n         YEAR(xsd:dateTime(?dob)),\n         "") as ?yob)\n         BIND(IF(bound(?dod),\n         YEAR(xsd:dateTime(?dod)),\n         "") as ?yod)\n         BIND(COALESCE(?thumbnail, "") as ?pic) .\n              FILTER (lang(?label) = \'en\')\n    }')},this.queryDispatcher=new O(this.endpointUrl),this.query=function(){var e=Object(p.a)(d.a.mark((function e(a){var n,r,i,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.queryDispatcher.query(t.sparqlQuery(a));case 2:return n=e.sent,e.next=5,t.queryDispatcher.query(t.rootSparqlQuery(a));case 5:return r=e.sent,u=n.results.bindings,i=u.map((function(e){return{id:e.descendant.value,name:e.label.value,birth:e.yob.value,death:e.yod.value,picture:e.pic.value,parent:e.person.value}})),l=N(r.results.bindings),e.abrupt("return",[].concat(Object(g.a)(i),Object(g.a)(l)));case 9:case"end":return e.stop()}var u}),e)})));return function(t){return e.apply(this,arguments)}}()},L=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(h.a)(this,a);for(var r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).wikidataTreeQuery=new I,e.dbpediaTreeQuery=new Q,e.state={wikidataQueryOverview:{status:n.NotStarted,nodeCount:null,time:null,error:null},dbpediaQueryOverview:{status:n.NotStarted,nodeCount:null,time:null,error:null},dbpediaTreeData:null,wikidataTreeData:null},e.startComparison=Object(p.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.startWikidataQuery();case 2:return t.next=4,e.startDbPediaQuery();case 4:case"end":return t.stop()}}),t)}))),e.startDbPediaQuery=Object(p.a)(d.a.mark((function t(){var a,r,i,l,u;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState((function(e){return{dbpediaQueryOverview:Object(w.a)(Object(w.a)({},e.dbpediaQueryOverview),{},{status:n.Running})}})),a="http://dbpedia.org/resource/"+e.props.match.params.wikiId,t.prev=2,r=(new Date).getTime(),t.next=6,e.dbpediaTreeQuery.query(a);case 6:i=t.sent,l=(new Date).getTime(),u=l-r,console.log(i),e.setState({dbpediaQueryOverview:{status:n.Finished,time:u,nodeCount:i.length,error:null},dbpediaTreeData:i}),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(2),e.setState({dbpediaQueryOverview:{status:n.Failed,time:null,nodeCount:null,error:"Error happened while querying data"}});case 16:case"end":return t.stop()}}),t,null,[[2,13]])}))),e.startWikidataQuery=Object(p.a)(d.a.mark((function t(){var a,r,i,l;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState((function(e){return{wikidataQueryOverview:Object(w.a)(Object(w.a)({},e.wikidataQueryOverview),{},{status:n.Running})}})),t.prev=1,a=(new Date).getTime(),t.next=5,e.wikidataTreeQuery.query(e.props.match.params.wikidataId);case 5:r=t.sent,i=(new Date).getTime(),l=i-a,e.setState({wikidataQueryOverview:{status:n.Finished,time:l,nodeCount:r.length,error:null},wikidataTreeData:r}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),e.setState({wikidataQueryOverview:{status:n.Failed,time:null,nodeCount:null,error:"Error happened while querying data"}});case 14:case"end":return t.stop()}}),t,null,[[1,11]])}))),e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.startComparison()}},{key:"render",value:function(){return u.a.createElement(E.d,{forceRenderTabPanel:!0},u.a.createElement(E.b,null,u.a.createElement(E.a,null,"Statistics"),u.a.createElement(E.a,null,"Wikidata Tree"),u.a.createElement(E.a,null,"DBpedia Tree")),u.a.createElement(E.c,null,u.a.createElement(A,{wikidataQueryOverview:this.state.wikidataQueryOverview,dbpediaQueryOverview:this.state.dbpediaQueryOverview})),u.a.createElement(E.c,null,null===this.state.wikidataTreeData?u.a.createElement(u.a.Fragment,null,"Loading..."):u.a.createElement(j,{data:this.state.wikidataTreeData})),u.a.createElement(E.c,null,null===this.state.dbpediaTreeData?u.a.createElement(u.a.Fragment,null,"Loading..."):u.a.createElement(j,{data:this.state.dbpediaTreeData})))}}]),a}(u.a.Component),q=(a(118),function e(){var t=this;Object(h.a)(this,e),this.endpointUrl="https://query.wikidata.org/sparql",this.sparqlQuery=function(e){return"SELECT DISTINCT ?film ?filmLabel ?filmDescription (SAMPLE(?image) AS ?pic1) (SAMPLE(?logo) AS ?pic2) (SAMPLE(?pubYear) AS ?year) WHERE {\n        BIND(wd:".concat(e,'  as ?person) .\n        ?film wdt:P31 wd:Q11424 .\n        ?film wdt:P577 ?pubDate .\n        ?film wdt:P161 ?person .\n        OPTIONAL{?film wdt:P18 ?image} .\n        OPTIONAL{?film wdt:P154 ?logo} .\n        BIND(YEAR(?pubDate) as ?pubYear) .\n       SERVICE wikibase:label {\n         bd:serviceParam wikibase:language "en" .\n       }\n      } GROUP BY ?film ?filmLabel ?filmDescription')},this.queryDispatcher=new O(this.endpointUrl),this.query=function(){var e=Object(p.a)(d.a.mark((function e(a){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.queryDispatcher.query(t.sparqlQuery(a));case 2:return n=e.sent,i=n.results.bindings,(r=i.map((function(e){var t,a,n;return{film:e.film.value,filmLabel:e.filmLabel.value,description:e.filmDescription.value,year:e.year.value,image:null!==(t=null===(a=e.pic1)||void 0===a?void 0:a.value)&&void 0!==t?t:null===(n=e.pic2)||void 0===n?void 0:n.value}}))).sort((function(e,t){return parseInt(t.year)-parseInt(e.year)})),e.abrupt("return",r);case 6:case"end":return e.stop()}var i}),e)})));return function(t){return e.apply(this,arguments)}}()}),P=function e(){var t=this;Object(h.a)(this,e),this.endpointUrl="https://dbpedia.org/sparql",this.sparqlQuery=function(e){return"SELECT DISTINCT ?film ?label ?year ?thumbnail ?description\n    WHERE {\n    BIND(<".concat(e,"> as ?person) .\n    ?film rdf:type dbo:Film .\n    ?film rdfs:label ?label .\n    ?film dbo:starring ?person .\n    ?film dbo:abstract ?description\n    OPTIONAL {?film dbo:releaseDate ?date} \n    OPTIONAL {?film dbo:thumbnail?thumbnail}\n    BIND(IF(bound(?date), YEAR(xsd:dateTime(?date)), \"\") as ?year)\n    FILTER (lang(?label) = 'en')\n    FILTER (lang(?description) = 'en')\n    }")},this.queryDispatcher=new O(this.endpointUrl),this.query=function(){var e=Object(p.a)(d.a.mark((function e(a){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.queryDispatcher.query(t.sparqlQuery(a));case 2:return n=e.sent,i=n.results.bindings,(r=i.map((function(e){var t;return{film:e.film.value,filmLabel:e.label.value,description:e.description.value,year:e.year.value,image:null===(t=e.thumbnail)||void 0===t?void 0:t.value}}))).sort((function(e,t){return parseInt(t.year)-parseInt(e.year)})),e.abrupt("return",r);case 6:case"end":return e.stop()}var i}),e)})));return function(t){return e.apply(this,arguments)}}()},R=function(e){var t=e.data,a=e.type;return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"card ".concat(a)},u.a.createElement("div",{className:"content"},void 0!==t.image?u.a.createElement("div",{className:"image"},u.a.createElement("img",{src:t.image})):null,u.a.createElement("div",{className:"text"},u.a.createElement("strong",null,t.filmLabel),u.a.createElement("p",null,t.year),u.a.createElement("p",null,t.description)))))},F=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).ref=void 0,e}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"cards"},this.props.data.map((function(t,a){return u.a.createElement(R,{data:t,key:a,type:e.props.type})})))}}]),a}(u.a.Component),B=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(h.a)(this,a);for(var r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).wikidataFilmQuery=new q,e.dbpediaFilmQuery=new P,e.state={wikidataQueryOverview:{status:n.NotStarted,nodeCount:null,time:null,error:null},dbpediaQueryOverview:{status:n.NotStarted,nodeCount:null,time:null,error:null},dbpediaFilmData:null,wikidataFilmData:null},e.startComparison=Object(p.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.startWikidataQuery();case 2:return t.next=4,e.startDbPediaQuery();case 4:case"end":return t.stop()}}),t)}))),e.startDbPediaQuery=Object(p.a)(d.a.mark((function t(){var a,r,i,l,u;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState((function(e){return{dbpediaQueryOverview:Object(w.a)(Object(w.a)({},e.dbpediaQueryOverview),{},{status:n.Running})}})),a="http://dbpedia.org/resource/"+e.props.match.params.wikiId,t.prev=2,r=(new Date).getTime(),t.next=6,e.dbpediaFilmQuery.query(a);case 6:i=t.sent,l=(new Date).getTime(),u=l-r,console.log(i),e.setState({dbpediaQueryOverview:{status:n.Finished,time:u,nodeCount:i.length,error:null},dbpediaFilmData:i}),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(2),e.setState({dbpediaQueryOverview:{status:n.Failed,time:null,nodeCount:null,error:"Error happened while querying data"}});case 16:case"end":return t.stop()}}),t,null,[[2,13]])}))),e.startWikidataQuery=Object(p.a)(d.a.mark((function t(){var a,r,i,l;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState((function(e){return{wikidataQueryOverview:Object(w.a)(Object(w.a)({},e.wikidataQueryOverview),{},{status:n.Running})}})),t.prev=1,a=(new Date).getTime(),t.next=5,e.wikidataFilmQuery.query(e.props.match.params.wikidataId);case 5:r=t.sent,i=(new Date).getTime(),console.log(r),l=i-a,e.setState({wikidataQueryOverview:{status:n.Finished,time:l,nodeCount:r.length,error:null},wikidataFilmData:r}),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),e.setState({wikidataQueryOverview:{status:n.Failed,time:null,nodeCount:null,error:"Error happened while querying data"}});case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.startComparison()}},{key:"render",value:function(){return u.a.createElement(E.d,{forceRenderTabPanel:!0},u.a.createElement(E.b,null,u.a.createElement(E.a,null,"Statistics"),u.a.createElement(E.a,null,"Wikidata Filmography"),u.a.createElement(E.a,null,"DBpedia Filmography")),u.a.createElement(E.c,null,u.a.createElement(A,{wikidataQueryOverview:this.state.wikidataQueryOverview,dbpediaQueryOverview:this.state.dbpediaQueryOverview})),u.a.createElement(E.c,null,null===this.state.wikidataFilmData?u.a.createElement(u.a.Fragment,null,"Loading..."):u.a.createElement(F,{data:this.state.wikidataFilmData,type:"wikidata"})),u.a.createElement(E.c,null,null===this.state.dbpediaFilmData?u.a.createElement(u.a.Fragment,null,"Loading..."):u.a.createElement(F,{data:this.state.dbpediaFilmData,type:"dbpedia"})))}}]),a}(u.a.Component);function U(){return u.a.createElement(o.a,null,u.a.createElement(u.a.Fragment,null,u.a.createElement(s.c,null,u.a.createElement(s.a,{path:"/tree-comparison/:wikidataId/:wikiId",render:function(e){return u.a.createElement(L,e)}}),u.a.createElement(s.a,{path:"/filmography-comparison/:wikidataId/:wikiId",render:function(e){return u.a.createElement(B,e)}}),u.a.createElement(s.a,{path:"/",render:function(e){return u.a.createElement(f,e)}}))))}i.a.render(u.a.createElement(U,null),document.getElementById("root"))}},[[105,1,2]]]);
//# sourceMappingURL=main.9310f489.chunk.js.map
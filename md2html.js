fs = require('fs');
function md2html(md_file_path,html_file_path){
	var data_md   = '';
	var data_html = '';
	var open_file=false;
	try{
		data_md = fs.readFileSync(md_file_path,{encoding:'utf8'}).toString();
		data_html=data_md;
		//使用换行符分割成数组然后逐行解析
		data_html=data_html.split('\n');
		var i=0;
		var all_html='';
		for(i=0;i<data_html.length;i++){
			//取得每一行的代码
			var line_html=data_html[i];
			//line_html+='<p>';
			
			/* 分割线 */
			//var arr=line_html.split(' ');
			var tmp_line=line_html.replace(' ','');//去除空格
			if(tmp_line.indexOf('***')!=-1){
				line_html='---------------------------------------<br>';
			}else if(tmp_line.indexOf('---')!=-1){
				line_html='---------------------------------------<br>';
			}
			//分割线结束


			/* title begin */
				
			if(line_html.indexOf('######')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h6>'+line_html;
				line_html+='</h6>';
			}
			if(line_html.indexOf('#####')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h5>'+line_html;
				line_html+='</h5>';
			}
			if(line_html.indexOf('####')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h4>'+line_html;
				line_html+='</h4>';
			}
			if(line_html.indexOf('###')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h3>'+line_html;
				line_html+='</h3>';
			}
			if(line_html.indexOf('##')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h2>'+line_html;
				line_html+='</h2>';
			}
			if(line_html.indexOf('#')!=-1){
				line_html=line_html.replace('#','');
				line_html='<h1>'+line_html;
				line_html+='</h1>';
			}
			/* title end */
			/* li begin */
			if(line_html.indexOf('*')!=-1){
				line_html=line_html.replace('*','');
				line_html='<li>'+line_html;
				line_html+='</li>';
			}
			/* li end */

			//line_html+='</p>';
			
			//
			all_html+=line_html;
		}
		open_file=true;
	}catch(err){
		console.log(err)
	}
	if(open_file===true){
		try{
			var fd = fs.openSync(html_file_path, 'w');
			buffer = new Buffer('' + all_html, 'utf8');
			fs.writeSync(fd, buffer, 0, buffer.length, null);
			fs.closeSync(fd);
		}catch(err){
			console.log(err)
		}
	}
}
md2html('mds/test.md','htmls/test.html');

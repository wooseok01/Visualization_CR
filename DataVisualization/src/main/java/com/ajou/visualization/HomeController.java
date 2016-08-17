package com.ajou.visualization;

import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ajou.visualization.action.GetCredosData;
import com.ajou.visualization.action.GetCredosData2;
import com.ajou.visualization.action.GetCredosData3;
import com.ajou.visualization.dao.AllDao;
import com.ajou.visualization.model.Consult;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Description;
import com.ajou.visualization.model.SimilarityPerson;

import net.sf.json.JSONArray;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	private GetCredosData credosData;
	private GetCredosData2 credosData2;
	private GetCredosData3 credosData3;
	private AllDao dao;
	
	
	@Autowired
	public void setDao(AllDao dao) {this.dao = dao;}
	public AllDao getDao() {return dao;}
	
	@Autowired
	public void setCredosData(GetCredosData credosData) {this.credosData = credosData;}
	public GetCredosData getCredosData() {return credosData;}

	@Autowired
	public void setCredosData2(GetCredosData2 credosData2) {this.credosData2 = credosData2;}
	public GetCredosData2 getCredosData2() {return credosData2;}
	
	@Autowired
	public void setCredosData3(GetCredosData3 credosData3) {this.credosData3 = credosData3;}
	public GetCredosData3 getCredosData3() {return credosData3;}
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home";
	}
	
	@RequestMapping(value = "/second", method = RequestMethod.GET)
	public String second(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home2";
	}
	
	@RequestMapping(value = "/third", method = RequestMethod.GET)
	public String third(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home3";
	}
	
	@RequestMapping(value = "/fourth", method = RequestMethod.GET)
	public String fourth(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home4";
	}
	
	@RequestMapping(value = "/five", method = RequestMethod.GET)
	public String fifth(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home5";
	}
	
	@RequestMapping(value = "/sixth", method = RequestMethod.GET)
	public String sixth(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "home6";
	}
	
	@RequestMapping("/getCredosData3")
	public @ResponseBody JSONArray getCredosData3(Model model, HttpServletRequest request){
		ArrayList<Consult2> consultList = credosData3.getCredosData();
		JSONArray jArray = JSONArray.fromObject(consultList);
		
		return jArray; 
	}
	
	
	
	
	
	@RequestMapping("/getCredosData")
	public @ResponseBody JSONArray getCredosData(Model model, HttpServletRequest request,
			@RequestParam(value="number", required=false) String number){
		ArrayList<Consult> consultList = null;
		if(number == null){
			consultList = credosData.getCredosData(1);
		}else{
			consultList = credosData.getCredosData(Integer.parseInt(number));
		}
		JSONArray jArray = JSONArray.fromObject(consultList);
		
		return jArray;
		
	}
	@RequestMapping("/getCredosData2")
	public @ResponseBody JSONArray getCredosData2(Model model, HttpServletRequest request){
		ArrayList<Consult2> consultList = null;
		consultList = credosData2.getCredosData();
		JSONArray jArray = JSONArray.fromObject(consultList);
		
		return jArray;
		
	}
	
	@RequestMapping("/getPatientName")
	public @ResponseBody JSONArray getPatientName(Model model, HttpServletRequest request){
		
		ArrayList<String> nameList = credosData2.getPatientName();
		JSONArray jArray = JSONArray.fromObject(nameList);
		return jArray;
	}
	
	@RequestMapping("/getDescription")
	public @ResponseBody JSONArray getDescription(Model model, HttpServletRequest request){
		
		ArrayList<Description> descriptionList = credosData2.getDescription();
		JSONArray jArray = JSONArray.fromObject(descriptionList);
		
		return jArray;
	}
	
	@RequestMapping("/getSimilarityPerson")
	public @ResponseBody JSONArray getSimilarityPerson(Model model, HttpServletRequest request){
		
		ArrayList<SimilarityPerson> similarityList = credosData2.getSimilarityPerson();
		JSONArray jArray = JSONArray.fromObject(similarityList);
		
		return jArray;
	}
	
	@RequestMapping("/getSimilarityColumn")
	public @ResponseBody JSONArray getSimilarityColumn(Model model, HttpServletRequest request){
		ArrayList<String> columnList = credosData2.getSimilarityColumn();
		JSONArray jArray = JSONArray.fromObject(columnList);
		return jArray;
	}
	
	
}

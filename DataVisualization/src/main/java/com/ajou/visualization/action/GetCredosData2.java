package com.ajou.visualization.action;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;

import com.ajou.visualization.dao.AllDao;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Description;
import com.ajou.visualization.model.SimilarityPerson;

public class GetCredosData2 {
	private AllDao dao;
	
	public GetCredosData2(){}

	public GetCredosData2(AllDao dao) {
		super();
		this.dao = dao;
	}

	@Autowired
	public void setDao(AllDao dao) {this.dao = dao;}
	public AllDao getDao() {return dao;}
	
	public ArrayList<Consult2> getCredosData(){
		ArrayList<Consult2> consultList = new ArrayList<Consult2>();
		
		consultList = dao.getCredosData2();
		
		return consultList;
	}
	
	public ArrayList<String> getPatientName(){
		ArrayList<Consult2> consultList = dao.getCredosData2();
		ArrayList<String> patientList = new ArrayList<String>();
		for(int i=0; i<consultList.size(); i+=4){
			patientList.add(consultList.get(i).getName());
		}
		System.out.println(patientList.toString());
		return patientList;
	}
	
	public void getMeaningValue(){
		String value[] = {"better", "betterworse", "maintain", "worse", "worsebetter"};
		
		ArrayList<Consult2> betterList = new ArrayList<Consult2>();
		ArrayList<Consult2> betterworseList = new ArrayList<Consult2>();
		ArrayList<Consult2> maintainList = new ArrayList<Consult2>();
		ArrayList<Consult2> worseList = new ArrayList<Consult2>();
		ArrayList<Consult2> worsebetterList = new ArrayList<Consult2>();
		
		betterList = dao.getMeaningValue(value[0]);
		betterworseList = dao.getMeaningValue(value[1]);
		maintainList = dao.getMeaningValue(value[2]);
		worseList = dao.getMeaningValue(value[3]);
		worsebetterList = dao.getMeaningValue(value[4]);

		HashMap<String, Integer> map = sortingTestQuestion(betterList);
		
	}
	
	public HashMap<String, Integer> sortingTestQuestion(ArrayList<Consult2> list){
		HashMap<String, Integer> result = new HashMap<String, Integer>();
		
		for(int i=0; i<list.size(); i++){
			if(result.get(list.get(i).getQ_kdsq_15()+"") == null){
				result.put(list.get(i).getQ_kdsq_15()+"",1);
			}else{
				int temp = result.get(list.get(i).getQ_kdsq_15()+"")+1;
				result.put(list.get(i).getQ_kdsq_15()+"", temp);
			}
		}
		
		return result;
	}
	
	public ArrayList<Description> getDescription(){
		return dao.getDescription();
	}

	public ArrayList<SimilarityPerson> getSimilarityPerson() {
		return dao.getSimilarityPerson();
	}

	public ArrayList<String> getSimilarityColumn() {
		return dao.getSimilarityColumn();
	}
}

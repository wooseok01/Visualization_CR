package com.ajou.visualization.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import com.ajou.visualization.model.Consult;
import com.ajou.visualization.model.Consult2;
import com.ajou.visualization.model.Description;
import com.ajou.visualization.model.Patient;
import com.ajou.visualization.model.SimilarityPerson;

public interface AllDaoInterface {
	public ArrayList<Consult> getCredosData(HashMap<String, Integer> map);
	public ArrayList<Consult2> getCredosData2();
	public ArrayList<String> getPatientName();
	public ArrayList<Consult2> getMeaningValue(String value);
	public ArrayList<Description> getDescription();
	public ArrayList<Patient> getCredosData3();
	public ArrayList<String> getPatientName2();
	public ArrayList<SimilarityPerson> getSimilarityPerson();
	public ArrayList<String> getSimilarityColumn();
	public ArrayList<String> getCredosQuestions();
	public ArrayList<String> getPatientsNameList();

}

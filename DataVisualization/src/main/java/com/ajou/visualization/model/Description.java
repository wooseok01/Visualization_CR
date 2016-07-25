package com.ajou.visualization.model;

public class Description {
	private String question;
	private String description;
	
	public Description(){}

	public String getQuestion() {return question;}
	public void setQuestion(String question) {this.question = question;}

	public String getDescription() {return description;}
	public void setDescription(String description) {this.description = description;}

	@Override
	public String toString() {
		return "Description [question=" + question + ", description=" + description + "]\n";
	}
	
	
	
}

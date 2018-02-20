/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mavenproject2;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author PerumalVa
 */
@Entity
@Table(name = "Feedback")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Feedback.findAll", query = "SELECT f FROM Feedback f"),
    @NamedQuery(name = "Feedback.findByFeedbackId", query = "SELECT f FROM Feedback f WHERE f.feedbackId = :feedbackId"),
    @NamedQuery(name = "Feedback.findByQuality", query = "SELECT f FROM Feedback f WHERE f.quality = :quality"),
    @NamedQuery(name = "Feedback.findByCancellation", query = "SELECT f FROM Feedback f WHERE f.cancellation = :cancellation"),
    @NamedQuery(name = "Feedback.findByWaiting", query = "SELECT f FROM Feedback f WHERE f.waiting = :waiting"),
    @NamedQuery(name = "Feedback.findByInfrastructure", query = "SELECT f FROM Feedback f WHERE f.infrastructure = :infrastructure"),
    @NamedQuery(name = "Feedback.findByScore", query = "SELECT f FROM Feedback f WHERE f.score = :score")})
public class Feedback implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "FeedbackId")
    private Integer feedbackId;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "FeedbackDescription")
    private String feedbackDescription;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quality")
    private Double quality;
    @Column(name = "Cancellation")
    private Double cancellation;
    @Column(name = "Waiting")
    private Double waiting;
    @Column(name = "Infrastructure")
    private Double infrastructure;
    @Column(name = "Score")
    private Double score;
    @JoinColumn(name = "PatientId", referencedColumnName = "PatientId")
    @ManyToOne
    private Patient patientId;
    @JoinColumn(name = "HospitalId", referencedColumnName = "HospitalId")
    @ManyToOne
    private Hospital hospitalId;
    @JoinColumn(name = "DoctorId", referencedColumnName = "DoctorId")
    @ManyToOne
    private Doctor doctorId;

    public Feedback() {
    }

    public Feedback(Integer feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Integer getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Integer feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getFeedbackDescription() {
        return feedbackDescription;
    }

    public void setFeedbackDescription(String feedbackDescription) {
        this.feedbackDescription = feedbackDescription;
    }

    public Double getQuality() {
        return quality;
    }

    public void setQuality(Double quality) {
        this.quality = quality;
    }

    public Double getCancellation() {
        return cancellation;
    }

    public void setCancellation(Double cancellation) {
        this.cancellation = cancellation;
    }

    public Double getWaiting() {
        return waiting;
    }

    public void setWaiting(Double waiting) {
        this.waiting = waiting;
    }

    public Double getInfrastructure() {
        return infrastructure;
    }

    public void setInfrastructure(Double infrastructure) {
        this.infrastructure = infrastructure;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Patient getPatientId() {
        return patientId;
    }

    public void setPatientId(Patient patientId) {
        this.patientId = patientId;
    }

    public Hospital getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Hospital hospitalId) {
        this.hospitalId = hospitalId;
    }

    public Doctor getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Doctor doctorId) {
        this.doctorId = doctorId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (feedbackId != null ? feedbackId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Feedback)) {
            return false;
        }
        Feedback other = (Feedback) object;
        if ((this.feedbackId == null && other.feedbackId != null) || (this.feedbackId != null && !this.feedbackId.equals(other.feedbackId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.mavenproject2.Feedback[ feedbackId=" + feedbackId + " ]";
    }
    
}

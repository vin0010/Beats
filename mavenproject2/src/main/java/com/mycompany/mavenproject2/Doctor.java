/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mavenproject2;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author PerumalVa
 */
@Entity
@Table(name = "Doctor")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Doctor.findAll", query = "SELECT d FROM Doctor d"),
    @NamedQuery(name = "Doctor.findByDoctorId", query = "SELECT d FROM Doctor d WHERE d.doctorId = :doctorId"),
    @NamedQuery(name = "Doctor.findByGender", query = "SELECT d FROM Doctor d WHERE d.gender = :gender"),
    @NamedQuery(name = "Doctor.findByAge", query = "SELECT d FROM Doctor d WHERE d.age = :age"),
    @NamedQuery(name = "Doctor.findByLatitude", query = "SELECT d FROM Doctor d WHERE d.latitude = :latitude"),
    @NamedQuery(name = "Doctor.findByLongitude", query = "SELECT d FROM Doctor d WHERE d.longitude = :longitude")})
public class Doctor implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "DoctorId")
    private Integer doctorId;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "DoctorName")
    private String doctorName;
    @Column(name = "Gender")
    private Character gender;
    @Column(name = "Age")
    private Integer age;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "latitude")
    private BigDecimal latitude;
    @Column(name = "longitude")
    private BigDecimal longitude;
    @OneToMany(mappedBy = "doctorId")
    private Collection<Appointment> appointmentCollection;
    @OneToMany(mappedBy = "doctorId")
    private Collection<Feedback> feedbackCollection;
    @JoinColumn(name = "SpecialityID", referencedColumnName = "SpecialityID")
    @ManyToOne
    private Speciality specialityID;
    @JoinColumn(name = "HospitalId", referencedColumnName = "HospitalId")
    @ManyToOne
    private Hospital hospitalId;

    public Doctor() {
    }

    public Doctor(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    @XmlTransient
    public Collection<Appointment> getAppointmentCollection() {
        return appointmentCollection;
    }

    public void setAppointmentCollection(Collection<Appointment> appointmentCollection) {
        this.appointmentCollection = appointmentCollection;
    }

    @XmlTransient
    public Collection<Feedback> getFeedbackCollection() {
        return feedbackCollection;
    }

    public void setFeedbackCollection(Collection<Feedback> feedbackCollection) {
        this.feedbackCollection = feedbackCollection;
    }

    public Speciality getSpecialityID() {
        return specialityID;
    }

    public void setSpecialityID(Speciality specialityID) {
        this.specialityID = specialityID;
    }

    public Hospital getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Hospital hospitalId) {
        this.hospitalId = hospitalId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (doctorId != null ? doctorId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Doctor)) {
            return false;
        }
        Doctor other = (Doctor) object;
        if ((this.doctorId == null && other.doctorId != null) || (this.doctorId != null && !this.doctorId.equals(other.doctorId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.mavenproject2.Doctor[ doctorId=" + doctorId + " ]";
    }
    
}

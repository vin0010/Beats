/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mavenproject2;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name = "speciality")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Speciality.findAll", query = "SELECT s FROM Speciality s"),
    @NamedQuery(name = "Speciality.findBySpecialityID", query = "SELECT s FROM Speciality s WHERE s.specialityID = :specialityID")})
public class Speciality implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "SpecialityID")
    private Integer specialityID;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "Specialityname")
    private String specialityname;
    @OneToMany(mappedBy = "specialityID")
    private Collection<Doctor> doctorCollection;

    public Speciality() {
    }

    public Speciality(Integer specialityID) {
        this.specialityID = specialityID;
    }

    public Integer getSpecialityID() {
        return specialityID;
    }

    public void setSpecialityID(Integer specialityID) {
        this.specialityID = specialityID;
    }

    public String getSpecialityname() {
        return specialityname;
    }

    public void setSpecialityname(String specialityname) {
        this.specialityname = specialityname;
    }

    @XmlTransient
    public Collection<Doctor> getDoctorCollection() {
        return doctorCollection;
    }

    public void setDoctorCollection(Collection<Doctor> doctorCollection) {
        this.doctorCollection = doctorCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (specialityID != null ? specialityID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Speciality)) {
            return false;
        }
        Speciality other = (Speciality) object;
        if ((this.specialityID == null && other.specialityID != null) || (this.specialityID != null && !this.specialityID.equals(other.specialityID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.mavenproject2.Speciality[ specialityID=" + specialityID + " ]";
    }
    
}

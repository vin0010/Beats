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
@Table(name = "Bloodgroup")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bloodgroup.findAll", query = "SELECT b FROM Bloodgroup b"),
    @NamedQuery(name = "Bloodgroup.findByBloodgroupID", query = "SELECT b FROM Bloodgroup b WHERE b.bloodgroupID = :bloodgroupID"),
    @NamedQuery(name = "Bloodgroup.findByBloodGroupName", query = "SELECT b FROM Bloodgroup b WHERE b.bloodGroupName = :bloodGroupName")})
public class Bloodgroup implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "BloodgroupID")
    private Integer bloodgroupID;
    @Size(max = 4)
    @Column(name = "BloodGroupName")
    private String bloodGroupName;

    public Bloodgroup() {
    }

    public Bloodgroup(Integer bloodgroupID) {
        this.bloodgroupID = bloodgroupID;
    }

    public Integer getBloodgroupID() {
        return bloodgroupID;
    }

    public void setBloodgroupID(Integer bloodgroupID) {
        this.bloodgroupID = bloodgroupID;
    }

    public String getBloodGroupName() {
        return bloodGroupName;
    }

    public void setBloodGroupName(String bloodGroupName) {
        this.bloodGroupName = bloodGroupName;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bloodgroupID != null ? bloodgroupID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bloodgroup)) {
            return false;
        }
        Bloodgroup other = (Bloodgroup) object;
        if ((this.bloodgroupID == null && other.bloodgroupID != null) || (this.bloodgroupID != null && !this.bloodgroupID.equals(other.bloodgroupID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.mavenproject2.Bloodgroup[ bloodgroupID=" + bloodgroupID + " ]";
    }
    
}

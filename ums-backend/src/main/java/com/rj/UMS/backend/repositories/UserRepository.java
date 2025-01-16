package com.rj.UMS.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rj.UMS.backend.entity.User;

public interface UserRepository extends JpaRepository<User , String> {

}

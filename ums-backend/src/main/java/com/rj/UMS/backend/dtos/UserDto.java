package com.rj.UMS.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class UserDto {

    private String id;
    private String username;
    private Integer age;

    private List<String> hobbies;

}

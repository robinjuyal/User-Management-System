# Description

PixelForge Nexus is a comprehensive secure project management system built for Creative SkillZ LLC. The system features role-based access control, secure authentication, project management, team assignments, and document management capabilities.

## 🏗️ System Architecture

- Backend: Spring Boot 3.2.1 with Spring Security
- Frontend: React 18 with modern hooks and context API
- Database: Postgres(PG Admin)
- Authentication: JWT with BCrypt password hashing
- Security: Role-based access control (RBAC)

## Setup Instructions 

- Open the ums-backend folder to any code editor and run the project . Note - your computer must have Springboot already installed with proper setup.
- Database is handled by Mysql therefore it should be installed on your pc
- If properly done your Springboot application will start to run on port 8080 .
- Open the ums-frontend folder to any code editor and run - ' npm start '
- The frontend code will start to run on your localhost port 3000 (Your computer should have node and npm already installed).

## Security features  

- JWT Authentication: Secure token-based authentication
- Password Hashing: BCrypt with strength 12
- Role-Based Access Control: Admin, Project Lead, Developer roles
- Input Validation: Server-side validation for all inputs
- File Upload Security: Type validation and size limits
- CORS Configuration: Secure cross-origin resource sharing
- SQL Injection Prevention: JPA/Hibernate with prepared statements`



### Application.peroperites file Springboot :-

```

spring.application.name=UMS-backend
spring.datasource.url=jdbc:mysql://localhost:3306/testing
spring.datasource.username=root
spring.datasource.password= your password
spring.jpa.datasource.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update

```

## API documentation :-
```

 > GET "http://localhost:8080/api/users" >  api/users - get all users

 > POST "http://localhost:8080/api/users/" > api/users - create new user

 > PUT "http://localhost:8080/api/users/{userId}" > api/users/{userId} - update user

 > DELETE "http://localhost:8080/api/{userId}" > api/users/{userId} - delete user

```
## Frontend overview :-
- LIVE DEMO
<img src="assets/DragAndDropHobby.gif" alt="Description of the GIF" width="1000">

- Preview : -
<img src="assets/frontend.png.png" alt="Alt text" width="1000" />

## Backend overview :-
- Test cases :
  Get all users >>>
  <img src="assets/getUsers.png" alt="Alt text" width="1000" />

  Update user >>>
  <img src="assets/updateUser.png" alt="Alt text" width="1000" />

### Rest Controller :-

```
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.createUser(userDto);

        if (saveUser) {
            return CommonUtil.createBuildResponseMessage("User created successfully", HttpStatus.CREATED);
        }
        return CommonUtil.createErrorResponseMessage("User not created", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.updateUser(id, userDto);

        if (saveUser) {
            return CommonUtil.createBuildResponseMessage("User updated successfully", HttpStatus.CREATED);
        }
        return CommonUtil.createErrorResponseMessage("Failed to update user", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> users = userService.getAllUser();
        if (CollectionUtils.isEmpty(users)) {

            return ResponseEntity.noContent().build();
        }
        return CommonUtil.createBuildResponse(users, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
     @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteUser(@PathVariable String id) throws Exception {

        userService.deleteUser(id);
        return CommonUtil.createBuildResponseMessage("Delete success", HttpStatus.OK);

    }

}

```

### Global Exception Handling :-
```
@Slf4j
@ControllerAdvice 
public class GlobalExceptionHandler {

     @ExceptionHandler(Exception.class)
    public ResponseEntity<?>handleException(Exception e){

        log.error("GlobalExceptionHandler :: handleException ::", e.getMessage());
       
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?>handleNullPointerException(Exception e){
        log.error("GlobalExceptionHandler :: handleNullPointerException ::", e.getMessage());
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?>handleResourceNotFoundException(Exception e){
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?>handleIllegalArgumentException(IllegalArgumentException e){

        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.BAD_REQUEST);

    }

}
```


# Author 
## Robin Juyal | robinjuyal29@gmail.com | 9548933347




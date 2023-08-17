CREATE OR REPLACE PROCEDURE new_job(
    jobid  hr_jobs.job_id%TYPE,
    title  hr_jobs.job_title%TYPE ,
    minsal hr_jobs.min_salary%TYPE) IS
    maxsal hr_jobs.max_salary%TYPE := 2 * minsal;
BEGIN
    
    INSERT INTO hr_jobs(job_id , job_title, min_salary, max_salary)
    VALUES (UPPER(jobid), title, minsal, maxsal);
    DBMS_OUTPUT.PUT_LINE('New row added to HR_JOBS table');
    DBMS_OUTPUT.PUT_LINE(jobid || '   ' || title || '   ' ||  minsal|| '   ' ||  maxsal);
END new_job;

BEGIN
    new_job('STD2','STUDEN2T',2000);
    commit;
END;

create or replace PROCEDURE update_emp (emp_id IN hr_employees.EMPLOYEE_ID%TYPE, sal IN hr_employees.salary%TYPE, phone IN hr_employees.phone_number%TYPE, mail IN hr_employees.email%TYPE)
IS
BEGIN
    UPDATE hr_employees SET salary= sal, phone_number = phone, email = mail WHERE employee_id=emp_id;
END update_emp;

CREATE OR REPLACE PROCEDURE check_salary (
    jobid hr_employees.job_id%TYPE,
    salary hr_employees.salary%TYPE) IS
    minsal hr_jobs.min_salary%TYPE;
    maxsal hr_jobs.max_salary%TYPE;
BEGIN
    SELECT min_salary,max_salary INTO minsal,maxsal FROM HR_JOBS WHERE job_id = UPPER(jobid);
    IF salary NOT BETWEEN minsal AND maxsal THEN
        RAISE_APPLICATION_ERROR(-20100,'Invalid Salary $' || salary || '. ' || 'Salaries for ' || jobid || ' must between $' || minsal || ' and $' || maxsal);
    END IF;
END;

CREATE OR REPLACE PROCEDURE employee_hire_sp 
(  employee_id IN hr_employees.EMPLOYEE_ID%TYPE,fname IN hr_employees.FIRST_NAME%TYPE, lname IN hr_employees.LAST_NAME%TYPE, 
v_email IN hr_employees.email%TYPE,phone IN hr_employees.phone_number%TYPE ,hiredate IN hr_employees.hire_date%TYPE,
job_id IN hr_employees.job_id%TYPE ,sal IN hr_employees.SALARY%TYPE  ,manager_id IN hr_employees.manager_id%TYPE, department_id  IN hr_employees.department_id%TYPE) IS

BEGIN

    INSERT INTO HR_EMPLOYEES (employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id) VALUES 
    (  employee_id ,fname , lname , v_email ,phone ,hiredate ,job_id ,sal ,manager_id , department_id  );
    
END employee_hire_sp;


BEGIN

   employee_hire_sp(208,'hung','nguyen','mhpro','123456789','2023-01-01','AC_MGR',14000,100,10);
END ;

CREATE OR REPLACE TRIGGER check_salary_trg
BEFORE INSERT OR UPDATE OF job_id, salary
ON HR_EMPLOYEES
FOR EACH ROW
BEGIN
    check_salary(:new.job_id, :new.salary);
END;


import rangeSlider from "rangeslider-pure";
import data_ from "../assets/data";
import "./share.js";

var spar2018maraton = () => {
    function getCurrentWindowHeight () {
        return window.innerHeight - 30
    }

    function setMapSize (map) {
        map.style.height = `${getCurrentWindowHeight()}px`
        map.style.width = 'auto';
    }

    var canvas = document.querySelector('.sparMaraton2018-canvas'),
        map = document.querySelector('.sparMaraton2018-map'),
        gl = canvas.getContext('webgl', {premultipliedAlpha: false}) || canvas.getContext('experimental-webgl');
        
    setMapSize(map)


    var timer = document.querySelector(".sparMaraton2018-current-time");

    var slider = document.querySelector('.sparMaraton2018-timeline-wrapper input[type="range"]');

    var time = 0;
    var speed = 60;
    var maxTime = 0;
    var isAnimate = true;
    var sex = 'all';
    var age = 'all';
    var raceId = '';
    var raceTime = '';
    var customRaceTime = '';

    var calcPointCode = `
            point = calcPoint(point,-100.000000,-6500.000000,227.864502,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1700.000000,-6500.000000,133.342926,1.570796,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,8200.000000,-8300.000000,274.281342,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,8200.000000,-6500.000000,133.342926,1.570796,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,10000.000000,73500.000000,3375.770508,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,8200.000000,73500.000000,45.572903,0.349066,int(1),1800.000000,1.221730,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,9200.000000,75900.000000,84.394264,2.792527,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,7500.000000,75400.000000,273.437408,2.443461,int(1),1800.000000,-1.221730,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,5100.000000,74150.000000,84.394264,0.349066,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,6800.000000,73500.000000,45.572903,0.349066,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,5000.000000,53000.000000,865.041199,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3200.000000,53000.000000,133.342926,-1.570796,int(1),-1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-8500.000000,51200.000000,493.706421,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-8500.000000,49400.000000,200.014404,2.356194,int(1),1800.000000,-2.356194,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-2900.000000,41600.000000,410.630432,-0.802851,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-1600.000000,42900.000000,66.671463,0.785398,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3200.000000,41100.000000,202.546234,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3200.000000,42900.000000,133.342926,1.570796,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,4900.000000,44750.000000,75.954834,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,6600.000000,44800.000000,133.342926,-1.570796,int(1),-1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,46500.000000,2168.932617,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,44800.000000,133.342926,-1.570796,int(1),-1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,59800.000000,42400.000000,101.273117,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,42400.000000,66.671463,-0.785398,int(1),-1800.000000,-0.785398,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,54100.000000,36000.000000,316.478485,0.785398,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56500.000000,36000.000000,66.671463,0.785398,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,54900.000000,18000.000000,767.987793,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56500.000000,18000.000000,66.671463,0.785398,int(1),1800.000000,3.926991,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56700.000000,15300.000000,84.394264,-0.785398,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,16600.000000,66.671463,0.785398,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,61400.000000,14800.000000,138.591393,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,61400.000000,16600.000000,66.671463,0.785398,int(1),1800.000000,2.356194,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,63600.000000,16400.000000,60.197132,3.926991,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,62600.000000,17500.000000,66.671463,0.785398,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,64500.000000,19500.000000,80.954834,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,62700.000000,19500.000000,133.342926,1.570796,int(1),1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,6500.000000,21300.000000,2375.698486,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,6500.000000,19500.000000,133.342926,1.570796,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,4800.000000,-12000.000000,1320.770142,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3000.000000,-12000.000000,133.342926,-1.570796,int(1),-1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-11000.000000,-13700.000000,599.199280,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-11000.000000,-15500.000000,133.342926,1.570796,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-12700.000000,-19700.000000,181.447662,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-11000.000000,-19700.000000,133.342926,1.570796,int(1),1800.000000,-3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-10300.000000,-21500.000000,33.757706,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-10300.000000,-19700.000000,133.342926,1.570796,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-6900.000000,-19700.000000,66.671463,-1.570796,int(1),-1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,9800.000000,-18000.000000,708.911804,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,9800.000000,-16400.000000,133.342926,1.570796,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,11600.000000,-13400.000000,122.371681,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,13400.000000,-13500.000000,66.671463,-0.785398,int(1),-1800.000000,2.356194,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,14500.000000,-9100.000000,168.788528,3.839724,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,13200.000000,-7800.000000,66.671463,0.785398,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,15000.000000,148000.000000,6574.312988,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,13200.000000,148000.000000,133.342926,1.570796,int(1),1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1300.000000,149600.000000,510.585266,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1500.000000,147800.000000,133.342926,1.570796,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-100.000000,139400.000000,354.455902,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1500.000000,139400.000000,133.342926,1.570796,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3300.000000,137800.000000,75.954834,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,3300.000000,136000.000000,133.342926,-1.570796,int(1),-1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,4800.000000,131000.000000,210.985657,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,6600.000000,131000.000000,66.671463,0.785398,int(1),1800.000000,-2.356194,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,9500.000000,126100.000000,232.084213,-0.872665,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,8100.000000,124700.000000,66.671463,-0.785398,int(1),-1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,9900.000000,122700.000000,80.174545,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,8100.000000,122700.000000,133.342926,-1.570796,int(1),-1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,650.000000,121100.000000,312.258759,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,600.000000,119300.000000,66.671463,0.785398,int(1),1800.000000,-0.785398,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-6500.000000,114600.000000,350.236176,0.785398,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,-5000.000000,113300.000000,198.748489,2.356194,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,31900.000000,111400.000000,1561.293823,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,31900.000000,109600.000000,132.498993,-1.570796,int(1),-1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,33700.000000,76000.000000,1417.823608,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,35500.000000,76000.000000,132.541183,1.570796,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,74200.000000,953.655151,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,76000.000000,132.541183,1.570796,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,59800.000000,78100.000000,101.273117,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,58000.000000,78100.000000,132.541183,1.570796,int(1),1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56500.000000,79900.000000,63.295696,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56500.000000,81600.000000,132.541183,-1.570796,int(1),-1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,54900.000000,91200.000000,400.872742,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,53000.000000,91200.000000,132.541183,1.570796,int(1),1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,51500.000000,93000.000000,67.515411,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,51500.000000,91250.000000,132.541183,1.570796,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,49800.000000,16500.000000,3156.345459,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,51500.000000,16500.000000,66.671463,0.785398,int(1),1800.000000,3.926991,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,54900.000000,10800.000000,278.501068,5.497787,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,56000.000000,12200.000000,66.249496,0.785398,int(1),1800.000000,3.141593,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,63600.000000,10500.000000,324.917908,4.712389,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,63600.000000,12200.000000,66.249496,0.785398,int(1),1800.000000,2.356194,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,69100.000000,15400.000000,265.841919,3.926991,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,67800.000000,16700.000000,66.249496,0.785398,int(1),1800.000000,1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,69600.000000,24000.000000,308.039063,3.141593,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,67800.000000,24000.000000,132.541183,1.570796,int(1),1800.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1800.000000,25800.000000,2785.010498,1.570796,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,1800.000000,24000.000000,132.541183,1.570796,int(1),1800.000000,-1.570796,distance,routePartDistance);routePartDistance = point.z;
            point = calcPoint(point,0.000000,0.000000,1012.731140,0.000000,int(0),0.000000,0.000000,distance,routePartDistance);routePartDistance = point.z;
        `;

    var shaders = {
        vertexMain: `
                attribute vec4 dataSource1;
                attribute vec4 dataSource2;
                attribute vec4 dataSource3;
                attribute vec4 dataSource4;
    
                uniform float time;
                uniform int sex;
                uniform int age;
                uniform int raceId;
                uniform float aSpeed;
                
                varying vec4 v_color;
                varying float v_raceId;   

                vec3 calcPoint(vec3 point, float x, float y,float routePart,float routeRadian,int type,float routeRadius,float routeRadian2, float distance, float routePartDistance) {
                 
                    float newPartDistance = routePartDistance + routePart;
                  
                    if (distance > routePartDistance && distance <= newPartDistance) {
                        if (type == 0) {
                            point.x = x + (sin(routeRadian) * (routePart - (distance - routePartDistance)) * 23.698293838862558) + (sin(routeRadian+1.5708) * dataSource4.a);
                            point.y = y + (cos(routeRadian) * (routePart - (distance - routePartDistance)) * 23.698293838862558) + (cos(routeRadian+1.5708) * dataSource4.a);
                        } 
                        if (type == 1) {
                            float partRatio = (routePart - (distance - routePartDistance)) / routePart;
                            float actualRadian = routeRadian * partRatio + routeRadian2;
                            point.x = x +  (sin(actualRadian) * (routeRadius - dataSource4.a));                 
                            point.y = y + (cos(actualRadian) * (routeRadius - dataSource4.a));
                        }
                    }
                    
                    point.z = newPartDistance;
                    
                    return point;
                }
    
                void main() {
                  float a = (dataSource1.x * dataSource2.x * dataSource3.x * dataSource4.x * 0.0) + 1.0;
                                
                  float s1_Time = dataSource2.x;
                  float s1_Len = 3900.0;
                  float s1_Speed = s1_Len / s1_Time;
                  
                  float s2_Time = dataSource2.y;
                  float s2_Len = 9000.0;
                  float s2_Speed = s2_Len / s2_Time;
                            
                  float s3_Time = dataSource2.z;
                  float s3_Len = 12200.0;
                  float s3_Speed = s3_Len / s3_Time;       
                                
                  float s4_Time = dataSource2.a;
                  float s4_Len = 15100.0;
                  float s4_Speed = s4_Len / s4_Time;       
                                
                  float s5_Time = dataSource3.x;
                  float s5_Len = 16700.0;
                  float s5_Speed = s5_Len / s5_Time;       
                                
                  float s6_Time = dataSource3.y;
                  float s6_Len = 21100.0;
                  float s6_Speed = s6_Len / s6_Time;       

                  float s7_Time = dataSource3.z;
                  float s7_Len = 30100.0;
                  float s7_Speed = s7_Len / s7_Time;   
                  
                  float s8_Time = dataSource3.a;
                  float s8_Len = 35400.0;
                  float s8_Speed = s8_Len / s8_Time;   
                  
                  float s9_Time = dataSource4.x;
                  float s9_Len = 39300.0;
                  float s9_Speed = s9_Len / s9_Time;   
                  
                  float s10_Time = dataSource4.y;
                  float s10_Len = 42200.0;
                  float s10_Speed = s10_Len / s10_Time;   
                  
                  float distance = 0.0;
                  if (time >= 0.0 && time < s1_Time) {
                    distance += time * 0.001 * s1_Speed;
                    if (distance > s1_Len) {
                        distance = s1_Len;
                    }
                  }
                  if (time >= s1_Time && time < s2_Time) {
                    distance += (time - s1_Time) * 0.001 * s2_Speed;
                    if (distance > s2_Len) {
                        distance = s2_Len;
                    }
                  }
                  if (time >= s2_Time && time < s3_Time) {
                    distance += (time - s1_Time - s2_Time) * 0.001 * s3_Speed;
                    if (distance > s3_Len) {
                        distance = s3_Len;
                    }
                  }
                  if (time >= s3_Time && time < s4_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time) * 0.001 * s4_Speed;
                    if (distance > s4_Len) {
                        distance = s4_Len;
                    }
                  }
                  if (time >= s4_Time && time < s5_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time) * 0.001 * s5_Speed;
                    if (distance > s5_Len) {
                        distance = s5_Len;
                    }
                  }
                  if (time >= s5_Time && time < s6_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time - s5_Time) * 0.001 * s6_Speed;
                    if (distance > s6_Len) {
                        distance = s6_Len;
                    }
                  }
                  if (time >= s6_Time && time < s7_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time - s5_Time - s6_Time) * 0.001 * s7_Speed;
                    if (distance > s7_Len) {
                        distance = s7_Len;
                    }
                  }
                  if (time >= s7_Time && time < s8_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time - s5_Time - s6_Time - s7_Time) * 0.001 * s8_Speed;
                    if (distance > s8_Len) {
                        distance = s8_Len;
                    }
                  }
                  if (time >= s8_Time && time < s9_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time - s5_Time - s6_Time - s7_Time - s8_Time) * 0.001 * s9_Speed;
                    if (distance > s9_Len) {
                        distance = s9_Len;
                    }
                  }
                  if (time >= s9_Time) {
                    distance += (time - s1_Time - s2_Time - s3_Time - s4_Time - s5_Time - s6_Time - s7_Time - s8_Time - s9_Time) * 0.001 * s10_Speed;
                    if (distance > s10_Len) {
                        distance = s10_Len;
                    }
                  }
                  
                  if (int(dataSource1.x) == int(22222.0)) {
                    distance = time * 0.001 * aSpeed;
                    if (distance > 42200.0) {
                        distance = 42200.0;
                    } 
                  }
                  
                  float distanceRatio = 0.00001;
                  
                  float routePartDistance = 0.0;   
                  float newPartDistance = 0.0;           
                  vec3 point;
                  
                  ${calcPointCode}
                  
                  point = point * distanceRatio;
                  
                  float sexFlag = 0.0;
                  if (sex == 0) {
                    sexFlag = 1.0;
                  } else {
                      if (sex == int(dataSource1.y)) {
                        sexFlag = 1.0;
                      } else {
                        sexFlag = 0.0;
                      }
                  }
                  
                  point.z = 1.0;
                  
                  float ageFlag = 0.0;
                  if (age == 0) {
                    ageFlag = 1.0;
                  } else {
                      if (age == 1 && int(dataSource1.z) > 0 && int(dataSource1.z) < 19) {
                        ageFlag = 1.0;
                      } else
                      if (age == 2 && int(dataSource1.z) > 18 && int(dataSource1.z) < 36) {
                        ageFlag = 1.0;
                      } else
                      if (age == 3 && int(dataSource1.z) > 35 && int(dataSource1.z) < 46) {
                        ageFlag = 1.0;
                      } else
                      if (age == 4 && int(dataSource1.z) > 45 && int(dataSource1.z) < 61) {
                        ageFlag = 1.0;
                      } else
                      if (age == 5 && int(dataSource1.z) > 59) {
                        ageFlag = 1.0;                                                                                                                
                      } else {
                        ageFlag = 0.0;
                      }
                  }
                  
                  float raceIdFlag = 0.0;
                  if (raceId == 0) {
                    raceIdFlag = 1.0;
                  } else {
                    if (raceId == int(dataSource1.x)) {
                        raceIdFlag = 1.0;
                        v_raceId = 1.0;                  
                      } else {
                        raceIdFlag = 0.0;
                      }
                  }
                  
                  if (sexFlag == 1.0 && ageFlag == 1.0) {
                    v_color = vec4(1.0,0.0,0.0,1.0);
                    point.z = -0.1;
                    gl_PointSize = 2.0;
                  } else {
                    v_color = vec4(0.6,0.6,0.6,1.0);
                    point.z = 0.0;
                    gl_PointSize = 1.0;
                  }
                  
                  if (v_raceId == 1.0) {
                   gl_PointSize = 80.0;
                   point.z = -0.2;
                  }
                  
                  
                  gl_Position = vec4(point.x - 0.816,point.y - 0.629, point.z, a);
                }`,
        fragmentMain: `   
                precision mediump float;
                
                uniform sampler2D u_texture;
                
                varying vec4 v_color;       
                varying float v_raceId;     
                void main() {                          
                    if (v_raceId == 0.0) {
                     gl_FragColor = v_color;
                    } else {
                     gl_FragColor = texture2D(u_texture, gl_PointCoord);
                      if(gl_FragColor.a < 0.8){
                            discard;
                        }
                    }
                }
                `
    };

    var resize = function (canvas, map) {
        setMapSize(map)
        var displayWidth = map.clientWidth;
        var displayHeight = getCurrentWindowHeight();
        if (canvas.width !== displayWidth ||
            canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    };

    var WebGLCompiler = function (gl, shaders) {
        var that = {};

        that.shaders = shaders || {};
        that.gl = gl;

        resize(canvas, map);
        gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);

        window.addEventListener('resize', () => {
            resize(canvas, map);
            gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);
        });

        that.createProgramWithShaders = function (vertexShaderName, fragmentShaderName) {
            var vertexShader = this.createShader(vertexShaderName),
                fragmentShader = this.createShader(fragmentShaderName);
            return this.createProgram(vertexShader, fragmentShader);
        };

        that.createShader = function (shaderName) {
            var shaderSource = this.shaders[shaderName];
            if (!shaderSource) {
                throw "Shader not found";
            }
            return this.compileShader(shaderSource, this.typeForShader(shaderName));
        };

        that.typeForShader = function (name) {
            if (name.indexOf('vertex') != -1) {
                return this.gl.VERTEX_SHADER;
            } else if (name.indexOf('fragment') != -1) {
                return this.gl.FRAGMENT_SHADER;
            } else {
                throw "Unknown shader type";
            }
        };

        that.compileShader = function (shaderSource, shaderType) {
            var shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, shaderSource);
            this.gl.compileShader(shader);
            return shader;
        };

        that.createProgram = function (vertexShader, fragmentShader) {
            var program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);

            if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                var error = this.gl.getProgramInfoLog(program);
                console.error(error);
                throw "Program failed to link. Error: #{error}";
            }

            return program;
        };

        return that;
    };

    var toSec = function (speedStr) {
        var tmp = speedStr.split(':');
        var h = parseInt(tmp[0]);
        var m = parseInt(tmp[1]);
        var s = parseInt(tmp[2]);
        return parseFloat(h * 60 * 60 + m * 60 + s);
    };

    var processData = function (data) {
        var points = data.length;
        var size = points * 4;
        var maxTime = 0;
        var attributeDatas = [
            new Float32Array(size),
            new Float32Array(size),
            new Float32Array(size),
            new Float32Array(size)
        ];

        var filtered = [];
        a: for (var i = 0, l = points; i < l; i++) {
            for (var j = 0, jl = 15; j < jl; j++) {
                if (!data[i][j] || data[i][j] === '') {
                    continue a;
                }
            }
            filtered.push(data[i]);
        }
        //console.log(parseInt(data.length) - parseInt(filtered.length), ' hiányzó adat');
        data = filtered;
        points = filtered.length;


        var vscale = 0;

        for (var i = 0, maxTime_ = 0, l = points; i < l; i++) {
            attributeDatas[0][i * 4] = parseFloat(data[i][0]);
            attributeDatas[0][i * 4 + 1] = data[i][1] === 'F' ? 1 : 2;// 0 ferfi 1 no
            attributeDatas[0][i * 4 + 2] = parseInt(data[i][2]);//kor
            attributeDatas[0][i * 4 + 3] = 0.0;//parseFloat(data[i][3]); ezmiez? b c?

            attributeDatas[1][i * 4] = toSec(data[i][4]) + Math.random() * vscale;//3,9  2x
            attributeDatas[1][i * 4 + 1] = toSec(data[i][5]) + Math.random() * vscale;//9   2y
            attributeDatas[1][i * 4 + 2] = toSec(data[i][6]) + Math.random() * vscale;//12,2  2z
            attributeDatas[1][i * 4 + 3] = toSec(data[i][7]) + Math.random() * vscale;//15,1  2a

            attributeDatas[2][i * 4] = toSec(data[i][8]) + Math.random() * vscale;//16,7   3x
            attributeDatas[2][i * 4 + 1] = toSec(data[i][9]) + Math.random() * vscale;//21,1  3y
            attributeDatas[2][i * 4 + 2] = toSec(data[i][10]) + Math.random() * vscale;//30,1   3z
            attributeDatas[2][i * 4 + 3] = toSec(data[i][11]) + Math.random() * vscale;//35,4   3a

            attributeDatas[3][i * 4] = toSec(data[i][12]) + Math.random() * vscale;//39,3  //4x

            // maxTime_ = parseFloat(toSec(data[i][13])) + Math.random() * vscale;// cél idő   - 42,2
            // if (maxTime_ > maxTime) {
            //     maxTime = maxTime_;
            // }
            attributeDatas[3][i * 4 + 1] = toSec(data[i][13]) + Math.random() * vscale//42,2   4y

            var minutePerKm = parseFloat(toSec(data[i][14]));
            var meterPerSec = 1000 / minutePerKm; // m/s

            attributeDatas[3][i * 4 + 2] = meterPerSec; //4z
            attributeDatas[3][i * 4 + 3] = 1500 - Math.random() * 3000;// ez valami rádius lesz // 4a
        }

        maxTime = toSec("06:00:00");

        return {attributeDatas: attributeDatas, size: size, points: points, maxTime: maxTime};
    };

    var sexInt = function (sex) {
        if (sex === 'all') return 0;
        if (sex === 'male') return 1;
        if (sex === 'female') return 2;
    };

    var ageInt = function (age) {
        return age;
    };

    var raceIdInt = function (raceId) {
        if (raceId) {
            return parseInt(raceId);
        }
        return 0;
    };

    var aSpeed = function () {
        if (raceId === 22222 && customRaceTime) {
            var tmp = parseFloat(42200 / toSec(customRaceTime));
            return tmp;
        }
        return parseFloat(42200 / toSec("4:00:00"));
    };

    var run = function (data) {

        maxTime = data.maxTime;

        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, shaders.vertexMain);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }

        var shaderf = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shaderf, shaders.fragmentMain);
        gl.compileShader(shaderf);

        if (!gl.getShaderParameter(shaderf, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shaderf));
            return null;
        }

        var compiler = WebGLCompiler(gl, shaders);

        var program = compiler.createProgramWithShaders('vertexMain', 'fragmentMain');

        gl.useProgram(program);

        var dataSourceBuffer = [
            gl.createBuffer(),
            gl.createBuffer(),
            gl.createBuffer(),
            gl.createBuffer()
        ];

        function bindBuffer(index) {
            gl.bindBuffer(gl.ARRAY_BUFFER, dataSourceBuffer[index]);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                data.attributeDatas[index],
                gl.STATIC_DRAW
            );

            var ds = gl.getAttribLocation(program, "dataSource" + (index + 1));
            gl.enableVertexAttribArray(ds);
            gl.vertexAttribPointer(ds, 4, gl.FLOAT, false, 0, 0);
        }

        bindBuffer(0);
        bindBuffer(1);
        bindBuffer(2);
        bindBuffer(3);

        var timeUniformLoc = gl.getUniformLocation(program, "time");
        gl.uniform1f(timeUniformLoc, time);

        var sexUniformLoc = gl.getUniformLocation(program, "sex");
        gl.uniform1i(sexUniformLoc, sexInt(sex));

        var ageUniformLoc = gl.getUniformLocation(program, "age");
        gl.uniform1i(ageUniformLoc, ageInt(age));

        var raceIdUniformLoc = gl.getUniformLocation(program, "raceId");
        gl.uniform1i(raceIdUniformLoc, raceIdInt(raceId));

        var aSpeedUniformLoc = gl.getUniformLocation(program, "aSpeed");
        gl.uniform1f(aSpeedUniformLoc, aSpeed());

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));


        var textureLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textureLocation, 0);

        var textureInfo = {
            width: 128,
            height: 128,
            texture: texture,
        };

        var image = new Image();
        image.src = "assets/person.png";
        image.addEventListener('load', function () {
            textureInfo.width = image.width;
            textureInfo.height = image.height;

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.enable(gl.BLEND);
        });

        var update = () => {

            if (isAnimate && time < maxTime * 1000) {

                gl.clearColor(0.0, 0.0, 0.0, 0.0);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(textureLocation, 0);

                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                gl.uniform1f(timeUniformLoc, time);
                gl.uniform1i(sexUniformLoc, sexInt(sex));
                gl.uniform1i(ageUniformLoc, ageInt(age));
                gl.uniform1i(raceIdUniformLoc, raceIdInt(raceId));
                gl.uniform1f(aSpeedUniformLoc, aSpeed());

                gl.drawArrays(gl.POINTS, 0, data.points);

                time += 16 * speed;

                updateSlider();

            }

            window.requestAnimationFrame(update);

        };

        window.requestAnimationFrame(update);

    };

    var formatTime = (timeSec) => {
        var sec_num = parseInt(timeSec, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    };

    var updateSlider = () => {

        var timeSec = parseInt(time / 1000);

        timer.innerHTML = formatTime(timeSec);

        if (slider.rangeSlider) {
            slider.rangeSlider.update({
                value: timeSec
            }, false);
        }
    };

    var createControls = (data) => {

        var startBtn = document.querySelector(".sparMaraton2018-timeline-controls-start");
        var stopBtn = document.querySelector(".sparMaraton2018-timeline-controls-stop");
        var speed1 = document.querySelector(".sparMaraton2018-timeline-controls-1");
        var speed60 = document.querySelector(".sparMaraton2018-timeline-controls-60");
        var speed120 = document.querySelector(".sparMaraton2018-timeline-controls-120");
        var speed600 = document.querySelector(".sparMaraton2018-timeline-controls-600");
        var speed10000 = document.querySelector(".sparMaraton2018-timeline-controls-10000");
        var sexAll = document.querySelector(".sparMaraton2018-filter-sex input[value=all]");
        var sexMale = document.querySelector(".sparMaraton2018-filter-sex input[value=male]");
        var sexFemale = document.querySelector(".sparMaraton2018-filter-sex input[value=female]");
        var ageAll = document.querySelector(".sparMaraton2018-filter-age input[value='all']");
        var age1 = document.querySelector(".sparMaraton2018-filter-age input[value='1']");
        var age2 = document.querySelector(".sparMaraton2018-filter-age input[value='2']");
        var age3 = document.querySelector(".sparMaraton2018-filter-age input[value='3']");
        var age4 = document.querySelector(".sparMaraton2018-filter-age input[value='4']");
        var age5 = document.querySelector(".sparMaraton2018-filter-age input[value='5']");
        var raceIdInput = document.querySelector(".sparMaraton2018-filter-race-id input");
        var raceTimeInput = document.querySelector(".sparMaraton2018-filter-race-time input");

        var raceIdRemove = document.querySelector(".sparMaraton2018-filter-remove-raceId");
        var raceTimeRemove = document.querySelector(".sparMaraton2018-filter-remove-raceTime");

        var removeActiveFromSpeed = () => {
            speed1.classList.remove("active");
            speed60.classList.remove("active");
            speed120.classList.remove("active");
            speed600.classList.remove("active");
            speed10000.classList.remove("active");
        };

        var setRaceTime = () => {

            for (var i = 0, l = data.length; i < l; i++) {
                if (parseInt(data[i][0]) == raceId) {
                    raceTimeInput.value = data[i][13];
                    raceTime = data[i][13];
                    raceTimeRemove.style.display = 'block';
                    return;
                }
            }

        };

        var setRaceId = () => {

            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i][13] == raceTime) {
                    raceIdInput.value = data[i][0];
                    raceId = parseInt(data[i][0]);
                    raceIdRemove.style.display = 'block';
                    return true;
                }
            }
            return false;

        };

        var validateTime = () => {
            if (raceTime.indexOf(':') > -1) {
                var parts = raceTime.split(':');
                if (parts && parts.length === 3) {
                    var h = parseInt(parts[0]);
                    var m = parseInt(parts[1]);
                    var s = parseInt(parts[1]);
                    if (h > -1 && h < 6 && m > -1 && m < 60 && s > -1 && s < 60) {
                        return true;
                    }
                }
            }
            return false;
        };

        var setCustomTime = () => {
            if (validateTime()) {
                raceId = 22222;
                raceIdInput.value = '';
                raceIdRemove.style.display = 'none';
                customRaceTime = raceTimeInput.value;
            } else {

            }
        };

        raceIdInput.onchange = (e) => {
            raceId = e.target.value;
            raceIdRemove.style.display = 'block';
            setRaceTime();
        };

        raceIdInput.onkeyup = (e) => {
            raceId = e.target.value;
            raceIdRemove.style.display = 'block';
            setRaceTime();
        };

        raceIdRemove.onclick = () => {
            raceId = null;
            raceIdInput.value = '';
            raceIdRemove.style.display = 'none';
        };

        raceTimeInput.onchange = (e) => {
            raceTime = e.target.value;
            raceTimeRemove.style.display = 'block';
            if (!setRaceId()) {
                setCustomTime();
            }
        };

        raceTimeInput.onkeyup = (e) => {
            raceTime = e.target.value;
            raceTimeRemove.style.display = 'block';
            if (!setRaceId()) {
                setCustomTime();
            }
        };

        raceTimeRemove.onclick = () => {
            raceTime = null;
            raceTimeInput.value = '';
            raceTimeRemove.style.display = 'none';
            if (raceId === 22222) {
                raceId = null;
            }
            customRaceTime = null;
        };

        ageAll.onclick = () => {
            age = 0;
        };

        age1.onclick = () => {
            age = 1;
        };

        age2.onclick = () => {
            age = 2;
        };

        age3.onclick = () => {
            age = 3;
        };

        age4.onclick = () => {
            age = 4;
        };

        age5.onclick = () => {
            age = 5;
        };

        sexAll.onclick = () => {
            sex = 'all';
        };

        sexMale.onclick = () => {
            sex = 'male';
        };

        sexFemale.onclick = () => {
            sex = 'female';
        };

        startBtn.onclick = () => {
            isAnimate = true;
            startBtn.style.display = "none";
            stopBtn.style.display = "block";
        };
        stopBtn.onclick = () => {
            isAnimate = false;
            startBtn.style.display = "block";
            stopBtn.style.display = "none";
        };

        speed1.onclick = () => {
            speed = 1;
            removeActiveFromSpeed();
            speed1.classList.add("active");
        };
        speed60.onclick = () => {
            speed = 60;
            removeActiveFromSpeed();
            speed60.classList.add("active");
        };
        speed120.onclick = () => {
            speed = 120;
            removeActiveFromSpeed();
            speed120.classList.add("active");
        };
        speed600.onclick = () => {
            speed = 600;
            removeActiveFromSpeed();
            speed600.classList.add("active");
        };
        speed10000.onclick = () => {
            speed = 10000;
            removeActiveFromSpeed();
            speed10000.classList.add("active");
        };

        canvas.onclick = () => {
            isAnimate = !isAnimate;
            if (isAnimate) {
                startBtn.style.display = "none";
                stopBtn.style.display = "block";
            } else {
                startBtn.style.display = "block";
                stopBtn.style.display = "none";
            }
        };


        rangeSlider.create(slider, {
            polyfill: true,     // Boolean, if true, custom markup will be created
            rangeClass: 'sparMaraton2018-timeline',
            disabledClass: 'rangeSlider--disabled',
            fillClass: 'rangeSlider__fill',
            bufferClass: 'rangeSlider__buffer',
            handleClass: 'sparMaraton2018-draggable',
            startEvent: ['mousedown', 'touchstart', 'pointerdown'],
            moveEvent: ['mousemove', 'touchmove', 'pointermove'],
            endEvent: ['mouseup', 'touchend', 'pointerup'],
            vertical: false,    // Boolean, if true slider will be displayed in vertical orientation
            min: 0,          // Number , 0
            max: maxTime,          // Number, 100
            step: 1,         // Number, 1
            value: 0,        // Number, center of slider
            buffer: null,       // Number, in percent, 0 by default
            stick: null,        // [Number stickTo, Number stickRadius] : use it if handle should stick to stickTo-th value in stickRadius
            borderRadius: 10,   // Number, if you use buffer + border-radius in css for looks good,
            onInit: () => {
                //console.info('onInit')
            },
            onSlideStart: function (position, value) {
                isAnimate = false;
            },
            onSlide: function (position, value) {
                isAnimate = false;
            },
            onSlideEnd: function (position, value) {
                isAnimate = true;
                time = maxTime * value * 1000;

                var timeSec = parseInt(time / 1000);
                timer.innerHTML = formatTime(timeSec);
            }
        });

    };

    
    var parsedData = JSON.parse(data_)
    var data = processData(parsedData);
    run(data);
    createControls(parsedData);

};

window.onload = () => {
    spar2018maraton();
};

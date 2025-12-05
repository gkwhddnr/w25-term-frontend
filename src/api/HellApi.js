import axios from 'axios';

// 기본 API 인스턴스 생성 및 baseURL 설정
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 각 엔티티별 경로가 다르므로 /api까지만 설정
    headers: {
        'Content-Type': 'application/json',
    },
});

// ----------------------------------------------------
// 1. Angel API (천사)
// ----------------------------------------------------
const AngelAPI = {
    // [C] 천사 생성 (POST /angels)
    create: async (angelData) => {
        const res = await api.post('/angels', angelData);
        return res.data;
    },

    /**
     * [R] 천사 조회 (GET /angels, GET /angels?name=...)
     * @param {string} [name] - 선택적 이름 (이름으로 목록 조회 시 사용)
     */
    get: async (name) => {
        const params = name ? { name } : {};
        const res = await api.get('/angels', { params });
        return res.data;
    },

    // [R] 천사 ID로 단일 조회 (GET /angels/{id})
    getById: async (id) => {
        const res = await api.get(`/angels/${id}`);
        return res.data;
    },

    // [U] 천사 수정 (PUT /angels/{id})
    update: async (id, angelData) => {
        const res = await api.put(`/angels/${id}`, angelData);
        return res.data;
    },

    // [D] 천사 삭제 (DELETE /angels/{id})
    delete: async (id) => {
        // DELETE는 보통 204 No Content를 반환하므로 res.data는 비어 있을 수 있음
        const res = await api.delete(`/angels/${id}`);
        return res.status === 204 ? null : res.data;
    }
};

// ----------------------------------------------------
// 2. Devil API (악마)
// ----------------------------------------------------
const DevilAPI = {
    // [C] 악마 생성 (POST /devils)
    create: async (devilData) => {
        const res = await api.post('/devils', devilData);
        return res.data;
    },

    /**
     * [R] 악마 조회 (GET /devils, GET /devils?type=...)
     * @param {string} [type] - 선택적 공격 타입 (타입으로 목록 조회 시 사용)
     */
    get: async (type) => {
        const params = type ? { type } : {};
        const res = await api.get('/devils', { params });
        return res.data;
    },

    // [R] 악마 ID로 단일 조회 (GET /devils/{id})
    getById: async (id) => {
        const res = await api.get(`/devils/${id}`);
        return res.data;
    },

    // [U] 악마 수정 (PUT /devils/{id})
    update: async (id, devilData) => {
        const res = await api.put(`/devils/${id}`, devilData);
        return res.data;
    },

    // [D] 악마 삭제 (DELETE /devils/{id})
    delete: async (id) => {
        const res = await api.delete(`/devils/${id}`);
        return res.status === 204 ? null : res.data;
    }
};

// ----------------------------------------------------
// 3. Building API (건물)
// ----------------------------------------------------
const BuildingAPI = {
    // [C] 건물 생성 (POST /buildings)
    create: async (buildingData) => {
        const res = await api.post('/buildings', buildingData);
        return res.data;
    },

    /**
     * [R] 건물 조회 (GET /buildings, GET /buildings?name=...)
     * @param {string} [name] - 선택적 이름 (이름으로 목록 조회 시 사용)
     */
    get: async (name) => {
        const params = name ? { name } : {};
        const res = await api.get('/buildings', { params });
        return res.data;
    },

    // [R] 건물 ID로 단일 조회 (GET /buildings/{id})
    getById: async (id) => {
        const res = await api.get(`/buildings/${id}`);
        return res.data;
    },

    // [U] 건물 수정 (PUT /buildings/{id})
    update: async (id, buildingData) => {
        const res = await api.put(`/buildings/${id}`, buildingData);
        return res.data;
    },

    // [D] 건물 삭제 (DELETE /buildings/{id})
    delete: async (id) => {
        const res = await api.delete(`/buildings/${id}`);
        return res.status === 204 ? null : res.data;
    }
};


// ----------------------------------------------------
// 모듈 내보내기
// ----------------------------------------------------
const HellApi = {
    Angel: AngelAPI,
    Devil: DevilAPI,
    Building: BuildingAPI,
    // 원한다면 기본 axios 인스턴스도 내보낼 수 있습니다.
    apiInstance: api,
};

export default HellApi;